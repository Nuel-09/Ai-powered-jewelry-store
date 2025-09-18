<template>
  <section class="py-10">
    <div class="mx-auto max-w-7xl px-6">
      <div class="flex items-end justify-between mb-4">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Featured Picks</h2>
          <p class="text-sm text-gray-600">Curated selection from our collection</p>
        </div>
        <NuxtLink to="/products" class="text-sm text-green-800 hover:underline">Shop all</NuxtLink>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(p, i) in featured" :key="p.id" v-reveal :data-reveal-delay="(i%4)*80 + 'ms'">
          <ProductCard :product="p" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import ProductCard from '@/components/productCard.vue'

const props = defineProps<{ products: Product[] }>()

// Simple heuristic: pick first 8 unique, biased by tags we want to highlight
const priority = [/diamond|halo/i, /gold/i, /modern|minimal/i, /vintage|art deco/i]
const scored = props.products.map(p => ({
  p,
  s: priority.reduce((acc, re, i) => acc + ((p as any).tags?.some((t: string) => re.test(t)) ? (priority.length - i) : 0), 0)
}))

const featured = scored
  .sort((a, b) => b.s - a.s)
  .slice(0, 8)
  .map(x => x.p)
</script>

<style scoped>
</style>


