<script setup lang="ts">
import { products } from '../data/products'
import Header from '../components/Header.vue'
import ProductGrid from '../components/productGrid.vue'
import { useHead } from '@unhead/vue'

useHead({title: 'Home'})
const featuredProducts = products.slice(0, 6)
</script>



<template>
  <div>
    <Header />
    <div class="space-y-12 p-6">
      <section class="text-center">
        <h1 class="text-4xl font-bold">Precious Moments</h1>
        <p class="mt-2 text-lg text-gray-600">Elegant wedding rings for timeless love</p>
      </section>

      <ProductGrid :products="featuredProducts" />
    </div>
  </div>
</template>

