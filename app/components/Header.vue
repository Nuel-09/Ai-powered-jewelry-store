<template>
  <nav class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <h1 class="text-xl font-bold text-gray-800">Precious Moments</h1>
    <ul class="flex space-x-6 text-gray-700 font-medium">
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/products">Products</NuxtLink></li>
      <li><NuxtLink to="/about">About</NuxtLink></li>
      <li><NuxtLink to="/contact">Contact</NuxtLink></li>
    </ul>
  </nav>
</template>

<script setup>
// No script needed unless there is need for dynamic behavior
</script>

<style scoped>
nav a:hover {
  color: #2563eb; /* Tailwind blue-600 */
}
</style>
