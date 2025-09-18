<template>
  <div>
    <Header />
    <div class="mx-auto max-w-7xl px-6 py-8 space-y-12">
      <!-- Breadcrumbs -->
      <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
        <NuxtLink to="/products" class="hover:text-gray-700">Products</NuxtLink>
        <span class="px-2">/</span>
        <span class="text-gray-900">{{ product?.name || 'Details' }}</span>
      </nav>

      <!-- Product Hero -->
      <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div v-reveal class="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
          <img :src="product?.image || '/images/placeholder.jpg'" :alt="product?.name" class="w-full h-auto object-cover" />
        </div>

        <div v-reveal :data-reveal-delay="'100ms'" class="space-y-4">
          <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900">{{ product?.name }}</h1>
          <p class="text-xl text-gray-800">£{{ product?.price }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="t in productTags" :key="t" class="inline-flex items-center rounded-full border px-3 py-1 text-xs text-gray-700">{{ t }}</span>
          </div>
          <p class="text-gray-700 leading-relaxed">{{ product?.description }}</p>

          <div class="flex items-center gap-3 pt-2">
            <button class="rounded-md px-4 py-2 text-white" style="background-color:#275B32">Add to bag</button>
            <NuxtLink to="/contact" class="rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50">Book consultation</NuxtLink>
          </div>

          <div class="pt-4 text-sm text-gray-500">
            Free resizing within 30 days • Secure shipping • Crafted with care
          </div>
        </div>
      </div>

      <!-- Related items -->
      <section v-if="related.length" class="space-y-4">
        <div class="flex items-end justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">You may also like</h2>
            <p class="text-sm text-gray-600">Based on similar style and tags</p>
          </div>
          <NuxtLink to="/products" class="text-sm text-green-800 hover:underline">Browse all</NuxtLink>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(p, i) in related" :key="p.id" v-reveal :data-reveal-delay="(i%4)*80 + 'ms'">
            <ProductCard :product="p" />
          </div>
        </div>
      </section>

      <!-- Assistant -->
      <AiAssistant :products="products" />
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { computed } from 'vue'
import { useHead, useRoute } from '#imports'
import { products } from '../data/products'
import Header from '../components/Header.vue'
import ProductCard from '../components/productCard.vue'
import AiAssistant from '../components/AiAssistant.vue'

const route = useRoute()
const id = computed(() => Number(route.query.id || 0))
const product = computed(() => products.find(p => p.id === id.value) || products[0])
const productTags = computed(() => (product.value?.tags ?? []))

const related = computed(() => {
  const tags = new Set((product.value?.tags ?? []).map((t: string) => t.toLowerCase()))
  const matches = products.filter(p => p.id !== product.value?.id && (p.tags || []).some(t => tags.has(t.toLowerCase())))
  return matches.slice(0, 8)
})

useHead({ title: product.value?.name ? `${product.value.name}` : 'Product Details' })
</script>

<style scoped>
</style>