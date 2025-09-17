<template>
    <Header />
    <!-- <h1>Products</h1> -->
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
      <!-- Toggle button -->
<filterToggle @toggle="showFilters = !showFilters" />


<div v-if="showFilters" class="z-20 mt-3">
  <advancedFilters
    v-model="filters"
    :products="products"
    @update:modelValue="(v) => { filters = v; showFilters = false }"
  />
</div>
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
import filterToggle from '@/components/filterToggle.vue'
import advancedFilters from '@/components/advancedFilters.vue'


const query = ref('')

// Get AI search function and reactive loading/error refs from the composable
const { search, loading, error } = useCfAiSearch() 
const aiResults = ref(null as null | any[]) 

// Compute products to show; prefer AI results when present, else fallback to local filter
const selected = ref<number | null>(null)

const visible = computed(() => {
    let base =
    aiResults.value?.length ? aiResults.value
    : selected.value != null ? products.filter(p => p.id === selected.value)
    : query.value
      ? products.filter(p =>
          p.name.toLowerCase().includes(query.value.toLowerCase()) ||
          (p.description || '').toLowerCase().includes(query.value.toLowerCase())
        )
      : products

  // filters logic
 
  return base.filter((p: any) => {
    const priceOk = p.price <= filters.maxPrice
    const tagsOk =
      filters.tags.length === 0 ||
      filters.tags.every(t =>
        (p.tags ?? []).some((pt: string) => pt.trim().toLowerCase() === t.trim().toLowerCase())
      )
    const termsOk = matchesText(p, filters.terms, filters.includeDescription)
    return priceOk && tagsOk && termsOk
  })
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

// implementing advanced filter
const showFilters = ref(false)
const filters = reactive({
  tags: [] as string[],
  maxPrice: Math.max(...products.map(p => p.price)),
  includeDescription: true,
  terms: ''
})

// Helper: text match across name/tags/description
function matchesText(p: any, q: string, includeDesc: boolean) {
  if (!q) return true
  const needle = q.toLowerCase()
  const name = p.name?.toLowerCase() ?? ''
  const tags = (p.tags ?? []).join(' ').toLowerCase()
  const desc = (p.description ?? '').toLowerCase()
  return (
    name.includes(needle) ||
    tags.includes(needle) ||
    (includeDesc && desc.includes(needle))
  )
}

useHead({ title: 'Products'})
</script>
