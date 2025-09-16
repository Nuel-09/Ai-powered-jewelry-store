<script setup lang="ts">
import { products } from '@/assets/data/products'
useHead({title: 'Home'})
const featuredProducts = products.slice(0, 4) 
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

