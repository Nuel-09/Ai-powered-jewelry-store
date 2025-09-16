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

<script setup>


const products = [
  { id: 1, name: 'Ring A', price: 199, image: '/placeholder.png' },
  { id: 2, name: 'Ring B', price: 249, image: '/placeholder.png' },
  { id: 3, name: 'Ring C', price: 299, image: '/placeholder.png' },
  { id: 4, name: 'Ring D', price: 349, image: '/placeholder.png' }
]

const featuredProducts = products.slice(0, 3)
</script>

