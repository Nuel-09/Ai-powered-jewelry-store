<template>
  <!-- Fixed header with centered menu and action icons -->
  <header>
    <nav
      class="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="flex justify-between items-center h-16">
          <!-- Left: Brand -->
          <div class="flex items-center">
            <NuxtLink to="/" class="group inline-flex items-center gap-2">
              <!-- Inline logo (vintage monogram) -->
              <span
                class="inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-gray-300 bg-gradient-to-br from-[#F7F2EA] to-white shadow group-hover:ring-green-300 transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-6 w-6 text-[#275B32]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3c-4.97 0-9 3.7-9 8.2 0 3.3 2 6.1 4.9 7.4-.3 1.3-1 2.5-2.3 3.4 1.9-.1 3.7-.7 5.1-1.8.4.1.9.1 1.3.1 4.97 0 9-3.7 9-8.2S16.97 3 12 3z"
                  />
                  <path
                    d="M9.5 12.2c0-1.8 1.5-3.2 3.5-3.2 1 0 1.8.3 2.4.9M8.2 15.5c.7.5 1.6.8 2.8.8 2.1 0 3.5-1.4 3.5-3.2"
                  />
                </svg>
              </span>
              <span
                class="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-green-800 transition-colors"
                style="font-family: 'Cinzel', serif; letter-spacing: 0.02em"
              >
                Precious Moments
              </span>
            </NuxtLink>
          </div>

          <!-- Center: Nav (desktop) -->
          <ul
            class="hidden lg:flex items-center justify-center gap-7 text-gray-700 font-medium"
            style="font-family: 'Marcellus', serif; letter-spacing: 0.02em"
          >
            <li>
              <NuxtLink
                to="/"
                class="relative inline-block py-1 transition-colors hover:text-green-800"
              >
                <span>Home</span>
                <span
                  class="absolute left-0 right-0 -bottom-0.5 mx-auto h-[2px] w-0 bg-green-800 transition-all group-hover:w-full"
                ></span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/products"
                class="relative inline-block py-1 transition-colors hover:text-green-800"
                >Products</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/products/1"
                class="relative inline-block py-1 transition-colors hover:text-green-800 whitespace-nowrap"
                >Product Details</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="relative inline-block py-1 transition-colors hover:text-green-800"
                >About</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="relative inline-block py-1 transition-colors hover:text-green-800"
                >Contact</NuxtLink
              >
            </li>
          </ul>

          <!-- Right: Icons + mobile menu button -->
          <div class="flex items-center justify-end gap-3 sm:gap-4">
            <!-- Mobile menu button (visible < lg) -->
            <button
              type="button"
              class="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-50 transition"
              aria-label="Open menu"
              @click="open = !open"
            >
              <svg
                v-if="!open"
                class="h-5 w-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
              <svg
                v-else
                class="h-5 w-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>

            <!-- icons hidden from mobile -->
            <div class="hidden sm:flex items-center gap-2 md:gap-3 lg:gap-4">
              <!-- Account -->
              <NuxtLink
                to="/login"
                class="hidden group relative lg:inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-50 transition"
                aria-label="Account"
              >
                <svg
                  class="h-5 w-5 text-gray-700 group-hover:text-green-800 transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span
                  class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition"
                  >Account</span
                >
              </NuxtLink>

              <!-- Search (to products) -->
              <NuxtLink
                to="/products"
                class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-50 transition"
                aria-label="Search"
              >
                <svg
                  class="h-5 w-5 text-gray-700 group-hover:text-green-800 transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
                <span
                  class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition"
                  >Search</span
                >
              </NuxtLink>

              <!-- Location (contact) -->
              <NuxtLink
                to="/contact"
                class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-50 transition"
                aria-label="Location"
              >
                <svg
                  class="h-5 w-5 text-gray-700 group-hover:text-green-800 transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"
                  />
                  <circle cx="12" cy="11" r="2" />
                </svg>
                <span
                  class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition"
                  >Location</span
                >
              </NuxtLink>

              <!-- Cart -->
              <NuxtLink
                to="/cart"
                class="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-50 transition"
                aria-label="Cart"
              >
                <svg
                  class="h-5 w-5 text-gray-700 group-hover:text-green-800 transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="16" cy="20" r="1" />
                  <path d="M3 3h2l.4 2M7 13h9l3-8H6.4" />
                </svg>
                <span
                  v-if="count > 0"
                  class="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white"
                  >{{ count }}</span
                >
                <span
                  class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition"
                  >Cart</span
                >
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Mobile dropdown panel -->
    <transition name="slide-fade">
      <div
        v-show="open"
        class="fixed top-16 inset-x-0 z-40 bg-white border-b shadow-sm lg:hidden"
      >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 py-3">
          <ul
            class="grid gap-2 text-gray-800"
            style="font-family: 'Marcellus', serif"
          >
            <li>
              <NuxtLink
                @click.native="open = false"
                to="/"
                class="block rounded-md px-3 py-2 hover:bg-gray-50"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                @click.native="open = false"
                to="/products"
                class="block rounded-md px-3 py-2 hover:bg-gray-50"
                >Products</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                @click.native="open = false"
                to="/products/1"
                class="block rounded-md px-3 py-2 hover:bg-gray-50"
                >Product Details</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                @click.native="open = false"
                to="/about"
                class="block rounded-md px-3 py-2 hover:bg-gray-50"
                >About</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                @click.native="open = false"
                to="/contact"
                class="block rounded-md px-3 py-2 hover:bg-gray-50"
                >Contact</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                @click.native="open = false"
                to="/login"
                class="block rounded-md px-3 py-2 hover:bg-gray-50"
                >Login</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- Spacer to prevent content from hiding behind fixed header -->
    <div class="h-16"></div>
  </header>
</template>

<script setup>
import { useCart } from "@/composables/useCart";
const open = ref(false);
const { count } = useCart();
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.18s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
