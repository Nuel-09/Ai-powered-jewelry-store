<template>
  <section class="py-10">
    <div class="mx-auto max-w-7xl px-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Shop by Category</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <button v-for="(c, i) in categories" :key="c.key" v-reveal :data-reveal-delay="(i*80)+'ms'" class="group relative overflow-hidden rounded-xl text-left shadow-sm ring-1 ring-transparent transition duration-500 ease-out hover:shadow-2xl hover:-translate-y-1 hover:ring-1 hover:ring-green-200">
          <div class="aspect-[4/3] overflow-hidden">
            <img :src="c.image" :alt="c.label" class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
            <!-- gradient reveal -->
            <div class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500" style="background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%);"></div>
          </div>
          <div class="p-3">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">{{ c.count }} items</p>
                <p class="font-medium text-gray-900 group-hover:text-green-800 transition-colors">{{ c.label }}</p>
              </div>
              <NuxtLink :to="'/products'" class="relative text-sm text-green-800">
                <span class="opacity-0 group-hover:opacity-100 transition">View</span>
                <span class="absolute -bottom-1 left-0 h-[2px] w-0 bg-green-800 transition-all group-hover:w-full"></span>
              </NuxtLink>
            </div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{ products: Product[] }>()

// derive categories using tags heuristics from provided data
const rules: { key: string; label: string; match: (p: Product) => boolean; image: string }[] = [
  { key: 'gold', label: 'Gold Rings', match: (p) => (p as any).tags?.some((t: string) => /gold/i.test(t)), image: '/images/ring-1.jpg' },
  { key: 'diamond', label: 'Diamond Styles', match: (p) => (p as any).tags?.some((t: string) => /diamond|halo|princess|emerald/i.test(t)), image: '/images/ring-10.jpg' },
  { key: 'vintage', label: 'Vintage & Art Deco', match: (p) => (p as any).tags?.some((t: string) => /vintage|art deco|antique|milgrain/i.test(t)), image: '/images/ring-7.jpg' },
  { key: 'modern', label: 'Modern Minimal', match: (p) => (p as any).tags?.some((t: string) => /modern|minimal|bezel|two tone/i.test(t)), image: '/images/ring-14.jpg' },
  { key: 'bands', label: 'Wedding Bands', match: (p) => (p as any).tags?.some((t: string) => /band|wedding|guard|stackable/i.test(t)), image: '/images/ring-12.jpg' },
]

const categories = rules.map(r => {
  const items = props.products.filter(r.match)
  return { key: r.key, label: r.label, count: items.length, image: r.image }
})
</script>

<style scoped>
</style>


