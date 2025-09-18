<template>
    <div>
      <Header />
      <h1>Product Details - Filter Test</h1>
      
      <div class="container mx-auto max-w-7xl px-6 py-8 space-y-8">
        <!-- Filter Toggle -->
        <div class="flex items-center gap-4">
          <filterToggle :count="activeFilterCount" @toggle="showFilters = !showFilters" />
          
          <!-- Debug Info -->
          <div class="text-xs text-gray-500">
            Debug: {{ activeFilterCount }} filters active
            Tags: {{ filters.tags.length }}, Max: ${{ filters.maxPrice }}, Terms: "{{ filters.terms }}"
            Visible: {{ visible.length }}
          </div>
        </div>
  
        <!-- Filter Panel -->
        <div v-if="showFilters" class="z-20 mt-3">
          <advancedFilters
            v-model="filters"
            :products="products"
            @update:modelValue="handleFilterUpdate"
          />
        </div>
  
        <!-- Results - Only show when filters are applied -->
        <div v-if="activeFilterCount > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard v-for="p in visible" :key="p.id" :product="p" />
        </div>
        <div v-else class="text-sm text-gray-500">
          Apply filters to see products.
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import { useHead } from '#imports'
  import { products } from '../data/products'
  import Header from '../components/Header.vue'
  import ProductCard from '../components/productCard.vue'
  import filterToggle from '../components/filterToggle.vue'
  import advancedFilters from '../components/advancedFilters.vue'
  
  const defaultMaxPrice = Math.max(...products.map(p => p.price))
  const showFilters = ref(false)
  const filters = reactive({
    tags: [] as string[],
    maxPrice: defaultMaxPrice,
    includeDescription: true,
    terms: ''
  })
  
  // Handle filter updates
  function handleFilterUpdate(newFilters: typeof filters) {
    filters.tags = [...newFilters.tags]
    filters.maxPrice = newFilters.maxPrice
    filters.includeDescription = newFilters.includeDescription
    filters.terms = newFilters.terms
    showFilters.value = false
  }
  
  // Helper function for text matching
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
  
  // Filter count for badge
  const activeFilterCount = computed(() => {
    let n = 0
    if (filters.tags.length > 0) n += filters.tags.length
    if (filters.maxPrice < defaultMaxPrice) n += 1
    if (!filters.includeDescription) n += 1
    if (filters.terms.trim().length > 0) n += 1
    return n
  })
  
  // Simple filtering logic
  const visible = computed(() => {
  console.log('Filtering with:', filters)
  console.log('All products:', products.length)
  
  const filtered = products.filter((p: any) => {
    const priceOk = p.price <= filters.maxPrice
    const normalized = (p.tags ?? []).map((t: string) => t.trim().toLowerCase())
    const tagsOk =
        filters.tags.length === 0 ||
        filters.tags.some((t: string) => normalized.includes(t.trim().toLowerCase()))
    const termsOk = matchesText(p, filters.terms, filters.includeDescription)
    
    console.log(`Product ${p.name}:`, { priceOk, tagsOk, termsOk, tags: p.tags, filterTags: filters.tags })
    
    return priceOk && tagsOk && termsOk
  })
  
  console.log('Filtered results:', filtered.length)
  return filtered
})
  
  useHead({ title: 'Product Details - Filter Test' })
  </script>