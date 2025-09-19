<template>
    <section aria-labelledby="featured-heading" class="mt-10">
        <div class="flex items-end justify-between">
            <h2 id="featured-heading" class="text-2xl font-bold text-gray-900">Featured products</h2>
            <NuxtLink to="/products" class="text-sm text-blue-600 hover:underline">View all</NuxtLink>
        </div>

        <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:cols-4">
            <ProductCard v-for="p in props.products" :key="p.id" :product="p" />
        </div>
    </section>
</template>
<script setup lang="ts">
import type { Product } from '~/types/product';
const props= defineProps({
    products: {
        type: Array as PropType<Product[]>
    }
})

</script>