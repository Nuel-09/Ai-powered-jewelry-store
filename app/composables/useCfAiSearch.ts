import type { Product } from '~/types/product'

export function useCfAiSearch() {
    const loading = ref(false)
    const error = ref<string | null>(null)

    const search = async (query: string, products: Product[]) => {
        loading.value = true
        error.value = null

        try {
            const { data } = await useFetch('/api/ai_search', {
                method: 'POST',
                body: {query, products}
            })
            return data.value as {ids: number[]; results: Product[]} | null
        }
        catch (e: any) {
            error.value = e?.message ?? 'AI search failed'
            return null
        } 
        finally {
            loading.value = false
        }
    }

    return {search, loading, error}
}