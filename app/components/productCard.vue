<template>
    <article class="group rounded-lg bg-white overflow-hidden shadow-sm transition duration-300 ease-out hover:shadow-xl hover:-translate-y-1">
        <NuxtImg
        :src="imageToShow"
        placeholder
        sizes="sm:100vw md:50vw lg:33vw0"
        :alt="product.name"
        class="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div class="p-4">
            <h3 class="font-semibold text-gray-900 transition-colors duration-300 line-clamp-1 group-hover:text-green-800">
                {{ product.name }}
            </h3>
            <p class="mt-1 text-gray-700">{{ product.price }}</p>
            <NuxtLink :to="`/products-details?id=${product.id}`" class="mt-3 inline-block text-sm text-green-800 hover:underline">
                view details
            </NuxtLink>
        </div>
    </article>
</template>

<script setup lang="ts">
type Product = {id: number; name: string; price: number; image?: string }

const props = withDefaults(defineProps<{ product: Product }>(), {
    product: () => ({ id: 0, name: '', price: 0, image: ''})
})

const imageToShow = computed(() => 
    props.product.image && props.product.image.length > 0
    ? props.product.image
    : '/images/placeholder.jpg'
)

</script>