import { ref } from 'vue'
import type { Product } from '~/types/product'
type AiReply = { message:string; items:{id:number; why:string; when:string}[]; results:Product[] }

export function useCfAiRecommend() {
    const loading = ref(false)
    const error = ref<string | null>(null)
    
    const recommend = async (prompt: string, products: Product[]) => {
        loading.value = true; error.value = null
        try {
            const { data } = await useFetch<AiReply>('/api/useCfAiRecommend', {
                method: 'POST', body: {prompt, products}
            })
            return data.value || null
        }
        catch (e:any) {
            error.value = e?.message ?? 'AI recommend failed'
            return null
        } 
        finally {
            loading.value = false
        }
    }
    return {recommend, loading, error}
}