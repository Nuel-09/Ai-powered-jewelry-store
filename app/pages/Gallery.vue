<template>
    <Header />
    <div class= "p-6">
        <h2 class= "text-2xl font-bold mb-4">Wedding Ring Gallery</h2>
        <productGrid :products="products" />
    </div>
    </template>

    <script setup>
    import productGrid from '~/components/productGrid.vue'
    // import products from '~/data/products.json'
    </script>
        
