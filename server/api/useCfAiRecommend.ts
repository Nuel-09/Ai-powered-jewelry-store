import type { Product } from '~/types/product'

export default defineEventHandler(async (event) => {
	const body = await readBody<{ prompt: string; products: Product[] }>(event)
	if (!body?.prompt || !Array.isArray(body?.products)) {
		throw createError({ statusCode: 400, statusMessage: 'prompt and products are required' })
	}

	const { cfAccountId, cfApiToken } = useRuntimeConfig()
	// Soft-fail in development if credentials are missing to avoid breaking the app
	if (!cfAccountId || !cfApiToken) {
		console.warn('[AI Recommend] Missing Cloudflare credentials. Set CF_ACCOUNT_ID and CF_API_TOKEN to enable AI recommendations.')
		return { message: '', items: [], results: [] }
	}

	// compact product data to reduce tokens and sanitize images
	const compact = body.products.map(p => {
		let imageUrl: string | undefined
		if (typeof (p as any).image === 'string') {
			const img = (p as any).image as string
			// allow only http/https URLs or site-relative paths. block data/base64 and other schemes
			if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/')) {
				imageUrl = img
			}
		}
		return {
			id: p.id,
			name: p.name,
			price: p.price,
			tags: p.tags ?? [],
			description: p.description ?? '',
			image: imageUrl
		}
	})

	const system = `You are a courteous jewellery stylist.
Given a user brief, select 3–6 products that best fit.
STRICT OUTPUT RULES: Return ONLY a raw JSON object, no prose, no code fences, no markdown.
Schema:
{
  "message": "polite, 2-4 short paragraphs tailored to the user",
  "items": [{ "id": number, "why": "1-2 sentences", "when": "1 sentence" }]
}
Products may include an optional image URL field named "image". Use it as additional context if helpful, but do not echo URLs.
Base decisions on tags, description, price tolerance implied, overall vibe, and image context if present. Avoid overpromising.`

	const user = `User brief: ${body.prompt}
Products: ${JSON.stringify(compact).slice(0, 12000)}`

	const endpoint = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`

	let res: { result?: { response?: string } } = {}
	try {
		res = await $fetch<{ result: { response: string } }>(endpoint, {
			method: 'POST',
			headers: { Authorization: `Bearer ${cfApiToken}` },
			body: { messages: [{ role: 'system', content: system }, { role: 'user', content: user }] },
			timeout: 15000
		})
	} catch (err) {
		// Network/API error – log and return empty results to avoid throwing 500s during development
		console.error('[AI Recommend] Cloudflare API request failed:', err)
		return { message: '', items: [], results: [] }
	}

	let text = res?.result?.response?.trim() || '{}'
	// strip common wrappers like ```json ... ``` or leading text
	if (text.startsWith('```')) {
		const start = text.indexOf('{')
		const end = text.lastIndexOf('}')
		if (start !== -1 && end !== -1 && end > start) text = text.slice(start, end + 1)
	}
	// attempt to extract the first JSON object if extra prose sneaks in
	if (!(text.startsWith('{') && text.endsWith('}'))) {
		const start = text.indexOf('{')
		const end = text.lastIndexOf('}')
		if (start !== -1 && end !== -1 && end > start) text = text.slice(start, end + 1)
	}

	let payload: { message: string; items: { id: number; why: string; when: string }[] } = { message: '', items: [] }
	try {
		payload = JSON.parse(text)
	} catch (e) {
		console.warn('[AI Recommend] Model response was not valid JSON. Raw text:', text)
	}
// match recommended id to original id
	const idSet = new Set((payload.items || []).map(i => i.id))
	const matched = body.products.filter(p => idSet.has(p.id))

	return { message: payload.message || '', items: payload.items || [], results: matched }
})


