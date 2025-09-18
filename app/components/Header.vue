<template>
  <!-- Fixed header with centered menu and action icons -->
  <header>
    <nav class="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid grid-cols-3 items-center h-16">
          <!-- Left: Brand -->
          <div class="flex items-center">
            <NuxtLink to="/" class="text-lg sm:text-xl font-bold tracking-tight text-gray-900 hover:text-green-800 transition-colors">Precious Moments</NuxtLink>
          </div>

          <!-- Center: Nav -->
          <ul class="hidden md:flex items-center justify-center gap-6 text-gray-700 font-medium">
            <li>
              <NuxtLink to="/" class="relative inline-block py-1 transition-colors hover:text-green-800">
                <span>Home</span>
                <span class="absolute left-0 right-0 -bottom-0.5 mx-auto h-[2px] w-0 bg-green-800 transition-all group-hover:w-full"></span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products" class="relative inline-block py-1 transition-colors hover:text-green-800">Products</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products-details" class="relative inline-block py-1 transition-colors hover:text-green-800 whitespace-nowrap">Product Details</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="relative inline-block py-1 transition-colors hover:text-green-800">About</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="relative inline-block py-1 transition-colors hover:text-green-800">Contact</NuxtLink>
            </li>
          </ul>

          <!-- Right: Icons -->
          <div class="flex items-center justify-end gap-3">
            <!-- Account -->
            <button type="button" class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-50 transition" aria-label="Account">
              <svg class="h-5 w-5 text-gray-700 group-hover:text-green-800 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21a8 8 0 0 0-16 0"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">Account</span>
            </button>

            <!-- Search (to products) -->
            <NuxtLink to="/products" class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-50 transition" aria-label="Search">
              <svg class="h-5 w-5 text-gray-700 group-hover:text-green-800 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="7"/>
                <path d="M21 21l-4.3-4.3"/>
              </svg>
              <span class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">Search</span>
            </NuxtLink>

            <!-- Location (contact) -->
            <NuxtLink to="/contact" class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-50 transition" aria-label="Location">
              <svg class="h-5 w-5 text-gray-700 group-hover:text-green-800 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"/>
                <circle cx="12" cy="11" r="2"/>
              </svg>
              <span class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">Location</span>
            </NuxtLink>

            <!-- Cart -->
            <button type="button" class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-50 transition" aria-label="Cart">
              <svg class="h-5 w-5 text-gray-700 group-hover:text-green-800 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="20" r="1"/>
                <circle cx="16" cy="20" r="1"/>
                <path d="M3 3h2l.4 2M7 13h9l3-8H6.4"/>
              </svg>
              <span class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <!-- Spacer to prevent content from hiding behind fixed header -->
    <div class="h-16"></div>
  </header>
</template>

<script setup>
// No script needed unless there is need for dynamic behavior
</script>

<style scoped>
</style>
