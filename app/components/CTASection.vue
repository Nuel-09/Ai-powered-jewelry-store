<template>
  <section class="py-14">
    <div class="mx-auto max-w-7xl px-6">
      <div class="rounded-2xl border p-8 sm:p-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between" style="background: linear-gradient(90deg, #F7F2EA 0%, #FFFFFF 100%);">
        <div class="space-y-1">
          <h3 class="text-xl font-semibold text-gray-900">Find your perfect match</h3>
          <p class="text-sm text-gray-700">Browse all rings or ask our Style Assistant for guidance.</p>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink to="/products" class="inline-flex items-center rounded-md px-4 py-2 text-white" style="background-color:#275B32">Shop all rings</NuxtLink>
          <NuxtLink to="/products" class="inline-flex items-center rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50">Open Style Assistant</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>


