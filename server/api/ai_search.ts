import type { Product } from '~/types/product'

export default defineEventHandler(async (event) => {
    const body = await readBody<{ query:string; products: Product[] }>(event)
    if (!body?.query || !Array.isArray(body?.products)) {
        throw createError({ statusCode: 400, statusMessage: 'query and products are required' })
    }

    const {cfAccountId, cfApiToken} = useRuntimeConfig()
    if (!cfAccountId || cfApiToken) {
        throw createError({ statusCode: 500, statusMessage: 'Missing Cloudflare credentials'})
    }

    // keep payload lean to reduce tokens
    const compact = body.products.map(p => ({
        id: p.id, name: p.name, price: p.price, tags: p.tags ?? [], description: p.description ?? ''
    }))

    const system = `You rank jewellery products for a storefront.
Return ONLY a JSON array of product ids best matching the user query.
Consider name, tags, description and price constraints.`

    const user = `user query: ${body.query}
    products: ${JSON.stringify(compact).slice(0, 12000)}`

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`

    const res = await $fetch<{ result: { response: string } }>(endpoint, {
        method: `POST`,
        headers: { Authorization: `Bearer ${cfApiToken}`},
        body: { message: [{ role: 'system', content: system}, { role: 'user', content: user} ]},
        timeout: 12000
    })

    const text = res?.result?.response?.trim() || '[]'
    let ids: number[] = []
    try { ids = JSON.parse(text) } catch { ids = [] }

    const idSet = new Set(ids)
    const ranked = body.products
        .filter(p => idSet.has(p.id))
        .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))

    return { ids, results: ranked }
})