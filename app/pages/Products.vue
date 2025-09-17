<template>
    <Header />
    <h1>Products</h1>
  <div class="container mx-auto max-w-7xl px-6 py-8 space-y-8">
    <div class="flex items-center gap-4">
      <SmartSearch
        :products="products"
        v-model:query="query"
        @select="(p) => { selected = p.id }"
        class="w-full max-w-xl"
      />
      <button
        class="rounded-md border px-3 py-2 text-sm"
        @click="() => { query = ''; selected = null }"
      >
        Clear
      </button>
    </div>
     <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" v-if="shown.length">
  <ProductCard v-for="p in shown" :key="p.id" :product="p" />
    </div>
    <div v-else-if="!loading" class="text-sm text-gray-500">
    Nothing matches your search.
    </div>
 
    <div v-if="showLoading">Searching with AI…</div>
    <div v-else-if="error">{{ error }}</div>
  </div>
 
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { products } from '~/data/products'
import { useCfAiSearch } from '~/composables/useCfAiSearch'


const query = ref('')

// Get AI search function and reactive loading/error refs from the composable
const { search, loading, error } = useCfAiSearch() 
const aiResults = ref(null as null | any[]) 

// Compute products to show; prefer AI results when present, else fallback to local filter
const selected = ref<number | null>(null)

const visible = computed(() => {
  if (aiResults.value?.length) return aiResults.value // use Ai results if returned first
  if (selected.value != null) {
    return products.filter(p => p.id === selected.value)
  }
  if (!query.value) return products
  const q = query.value.toLowerCase()
  return products.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
  )
})

// Debounced search: wait 300ms after typing before running logic
watchDebounced(query, async (q) => {
    aiResults.value = null
    if  (!q) return
    // Quick local keyword filter (name + description)
    const local = products.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(q.toLowerCase())
    )
    if (local.length >=3) return
    // call and store Ai-ranked results, const visisble wil pick it up
    const res = await search(q, products)
    aiResults.value = res?.results ?? null
}, { debounce: 300})

//  displays searching with Ai til loading is complete.
const showLoading = ref(false)
let startedAt = 0

watch(loading, (isloading) => {
    if (isloading) {
        startedAt = Date.now()
        showLoading.value = true
    }
    else{
        const MIN = 8000
        const elapsed = Date.now() - startedAt
        setTimeout(() => {showLoading.value = false }, Math.max(0, MIN -elapsed))
    }
})

const shown = computed(() => aiResults.value?.length ? aiResults.value : visible.value) // show ai block first then fallback to loacl if fail

useHead({ title: 'Products'})
</script>
