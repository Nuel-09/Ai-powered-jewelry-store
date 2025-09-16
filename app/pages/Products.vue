<template>
    <Header />
  <div>
    <h1>Products</h1>
    <ProductGrid :products="products" />
  </div>
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

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard v-for="p in visible" :key="p.id" :product="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { products } from '@/assets/data/products'


useHead({ title: 'Products' })

const query = ref('')
const selected = ref<number | null>(null)

const visible = computed(() => {
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
useHead({ title: 'Products'})
</script>
