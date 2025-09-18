<template>
    <Header />
    <h1>Products</h1>
  <div class="container mx-auto max-w-7xl px-6 py-8 space-y-8">
    <div class="flex items-center gap-4">
      <SmartSearch
        :products="products"
        v-model:query="query"
        @select="(p: any) => { selected = p.id }"
        class="w-full max-w-xl"
      />
      <button
        class="rounded-md border px-3 py-2 text-sm"
        @click="() => { query = ''; selected = null }">
        Clear
      </button>
      <!-- Toggle button (floating) -->
      <div class="fixed top right-10 z-40">
        <filterToggle :count="activeFilterCount" @toggle="showFilters = !showFilters" />
      </div>

<AiAssistant :products="products" />



<transition name="afade">
  <div v-show="showFilters" class="fixed bottom-24 right-24 z-40 w-[92vw] max-w-md rounded-xl overflow-hidden shadow-2xl border bg-white">
    <div class="p-3 text-white flex items-center justify-between" style="background: linear-gradient(90deg, #C98D54 0%, #B98A2A 35%, #C8AC5F 65%, #275B32 100%);">
      <div class="flex items-center gap-2">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">💎</span>
        <h3 class="font-semibold">Advanced Filters</h3>
      </div>
      <button class="text-white/90 hover:text-white" @click="showFilters = false" aria-label="Close filters">✕</button>
    </div>
    <div class="p-4 max-h-[70vh] overflow-y-auto">
      <advancedFilters
        v-model="filters"
        :products="products"
        @update:modelValue="handleFilterUpdate"
      />
    </div>
  </div>
  </transition>
    </div>
    
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" v-if="visible.length">
      <ProductCard v-for="p in visible" :key="p.id" :product="p" />
    </div>
    <div v-else-if="!loading" class="text-sm text-gray-500">
      Nothing matches your search.
    </div>
 
    <div v-if="showLoading">Searching with AI…</div>
    <div v-else-if="error">{{ error }}</div>
  </div>
 
</template>

<script setup lang="ts">

import { ref, reactive, computed, watch } from 'vue'
import { useHead } from '#imports'
import { watchDebounced } from '@vueuse/core'
import { products } from '../data/products'
import { useCfAiSearch } from '../composables/useCfAiSearch'
import Header from '../components/Header.vue'
import SmartSearch from '../components/SmartSearch.vue'
import ProductCard from '../components/productCard.vue'
import filterToggle from '../components/filterToggle.vue'
import advancedFilters from '../components/advancedFilters.vue'


const query = ref('')

// Get AI search function and reactive loading/error refs from the composable
const { search, loading, error } = useCfAiSearch() 
const aiResults = ref(null as null | any[]) 

// Compute products to show; prefer AI results when present, else fallback to local filter
const selected = ref<number | null>(null)

const defaultMaxPrice = Math.max(...products.map(p => p.price))
// implementing advanced filter
const showFilters = ref(false)
const filters = reactive({
  tags: [] as string[],
  maxPrice: defaultMaxPrice,
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

// badge count for the toggle
const activeFilterCount = computed(() => {
  let n = 0
  if (filters.tags.length) n += filters.tags.length
  if (filters.maxPrice < defaultMaxPrice) n += 1
  if (!filters.includeDescription) n += 1
  if (filters.terms.trim().length) n += 1
  return n
})

// Separate concerns: search, AI base, then filters
const hasActiveFilters = computed(() =>
  filters.tags.length > 0 ||
  filters.maxPrice < defaultMaxPrice ||
  !filters.includeDescription ||
  filters.terms.trim().length > 0
)

const searchResults = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return products
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.description || '').toLowerCase().includes(q)
  )
})

const baseResults = computed(() => {
  if (aiResults.value?.length && !hasActiveFilters.value) return aiResults.value as any[]
  if (selected.value != null) return products.filter(p => p.id === selected.value)
  return searchResults.value as any[]
})

const visible = computed(() => {
  console.log('Products page – filtering with:', JSON.parse(JSON.stringify(filters)))
  console.log('Base results count:', baseResults.value.length)
  const out = baseResults.value.filter((p: any) => {
    const priceOk = p.price <= filters.maxPrice
    const normalized = (p.tags ?? []).map((t: string) => t.trim().toLowerCase())
    const tagsOk =
      filters.tags.length === 0 ||
      filters.tags.some((t: string) => normalized.includes(t.trim().toLowerCase()))
    const termsOk = matchesText(p, filters.terms, filters.includeDescription)
    const textOrTagsOk = tagsOk || termsOk
    const keep = priceOk && textOrTagsOk // price is mandatory
    if (!keep) console.log('Filtered out:', p.name, { priceOk, tagsOk, termsOk, textOrTagsOk, productTags: p.tags, filterTags: filters.tags })
    return keep
  })
  console.log('Filtered results count:', out.length)
  return out
})

function handleFilterUpdate(v: {
  tags: string[]
  maxPrice: number
  includeDescription: boolean
  terms: string
}) {
  filters.tags = [...v.tags]
  filters.maxPrice = v.maxPrice
  filters.includeDescription = v.includeDescription
  filters.terms = v.terms
  selected.value = null
  query.value = ''
  showFilters.value = false
}
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

<style scoped>
.afade-enter-active, .afade-leave-active { transition: all .2s ease; }
.afade-enter-from, .afade-leave-to { opacity: 0; transform: translateY(8px) scale(.98); }
</style>
