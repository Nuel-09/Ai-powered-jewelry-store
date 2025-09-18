<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
      <div class="h-full w-full" style="background: radial-gradient(100% 60% at 50% 0%, #F7F2EA 0%, #FFFFFF 60%);"></div>
    </div>
    <div class="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 grid gap-8 lg:grid-cols-2 lg:items-center">
      <div class="space-y-6">
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">Precious Moments</h1>
        <p class="text-lg text-gray-700 max-w-prose">Elegant wedding and commitment rings crafted to celebrate the stories you hold dear.</p>
        <div class="flex items-center gap-3">
          <NuxtLink to="/products" class="inline-flex items-center rounded-md px-4 py-2 text-white" style="background-color:#275B32">Shop Rings</NuxtLink>
          <NuxtLink to="/about" class="inline-flex items-center rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50">Our Story</NuxtLink>
        </div>
      </div>
      <div class="relative hidden lg:block">
        <img src="/images/ring-17.jpg" alt="Signature ring" class="w-full rounded-xl shadow-2xl" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Presentational hero section
</script>

<style scoped>
</style>


