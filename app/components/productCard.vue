<template>
    <article class="group rounded-lg border bg-white overflow-hidden shadow-sm hover-md transition">
        <NuxtImg
        :src="imageToShow"
        placeholder
        sizes="sm:100vw md:50vw lg:33vw0"
        :alt="product.name"
        />
        <div class="p-4">
            <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
                {{ product.name }}
            </h3>
            <p class="mt-1 text-gray-700">{{ product.price }}</p>
            <NuxtLink :to="`/products`" class="mt-3 inline-block text-sm text-blue-600 hover:underline">
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