import type { Product } from '~/types/product'

export default defineEventHandler(async (event) => {
    const body = await readBody<{ query:string; products: Product[] }>(event)
    if (!body?.query || !Array.isArray(body?.products)) {
        throw createError({ statusCode: 400, statusMessage: 'query and products are required' })
    }

    const {cfAccountId, cfApiToken} = useRuntimeConfig()
    // If credentials are missing, fail soft with empty results so the app doesn't break in dev
    if (!cfAccountId || !cfApiToken) {
        console.warn('[AI Search] Missing Cloudflare credentials. Set CF_ACCOUNT_ID and CF_API_TOKEN to enable AI ranking.')
        return { ids: [], results: [] }
    }

    // keep payload lean to reduce tokens
    const compact = body.products.map(p => ({
        id: p.id, name: p.name, price: p.price, tags: p.tags ?? [], description: p.description ?? ''
    }))
// client prompt for Ai model deep search
    const system = `You rank jewellery products for a storefront.
Return ONLY a JSON array of product ids best matching the user query.
Consider name, tags, description and price constraints.
STRICT OUTPUT RULES: Return ONLY a raw JSON object, no prose, no code fences, no markdown.`

    const user = `user query: ${body.query}
    products: ${JSON.stringify(compact).slice(0, 12000)}`

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`

    let res: { result?: { response?: string } } = {}
    try {
        res = await $fetch<{ result: { response: string } }>(endpoint, {
            method: `POST`,
            headers: { Authorization: `Bearer ${cfApiToken}`},
            body: { message: [{ role: 'system', content: system}, { role: 'user', content: user} ]},
            timeout: 12000
        })
    }
    catch (err) {
        // Network/API error – log and return empty results to avoid throwing 500s during development
        console.error('[AI Search] Cloudflare API request failed:', err)
        return { ids: [], results: [] }
    }

    const text = res?.result?.response?.trim() || '[]'
    let ids: number[] = []
    try { ids = JSON.parse(text) } catch (e) { 
        console.warn('[AI Search] Model response was not valid JSON array. Raw text:', text)
        ids = [] 
    }

    const idSet = new Set(ids)
    const ranked = body.products
        .filter(p => idSet.has(p.id))
        .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))

    return { ids, results: ranked }
})