<template>
    <Header />
  <div>
    <h1>Products</h1>
    <ProductGrid :products="products" />
  </div>
</template>

<script setup>
import { products } from '@/assets/data/products'
useHead({ title: 'Products'})
</script>
