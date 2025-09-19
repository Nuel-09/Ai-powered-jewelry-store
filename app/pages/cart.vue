<template>
  <div>
    <Header />
    <div class="mx-auto max-w-7xl px-6 py-8 grid gap-8 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-4">
        <h1 class="text-2xl font-semibold text-gray-900">Your Cart</h1>
        <div v-if="items.length === 0" class="rounded-lg border p-6 text-gray-700">Your cart is empty.</div>

        <div v-else class="space-y-3">
          <div v-for="it in items" :key="it.id" class="rounded-lg border p-3 flex items-center gap-4">
            <img :src="it.image" :alt="it.name" class="h-16 w-16 rounded object-cover" />
            <div class="flex-1">
              <p class="font-medium text-gray-900">{{ it.name }}</p>
              <p class="text-sm text-gray-600">{{ formatPrice(it.price) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <input type="number" min="1" class="w-16 rounded-md border px-2 py-1" :value="it.qty" @change="(e:any)=>updateQty(it.id, Number(e.target.value||1))" />
              <button class="text-sm text-red-600 hover:underline" @click="remove(it.id)">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-4">
        <div class="rounded-lg border p-4">
          <div class="flex items-center justify-between text-gray-800">
            <span>Subtotal</span>
            <span class="font-semibold">{{ formatPrice(subtotal) }}</span>
          </div>
          <p class="mt-1 text-xs text-gray-500">Taxes and shipping calculated at checkout.</p>
          <button class="mt-4 w-full rounded-md px-4 py-2 text-white disabled:opacity-50" :disabled="items.length===0" style="background-color:#275B32">Checkout</button>
        </div>

        <div class="rounded-lg border p-4">
          <p class="text-sm font-medium text-gray-800 mb-3">Payment methods</p>
          <div class="grid grid-cols-3 gap-2">
            <span class="inline-flex items-center justify-center rounded-md border px-2 py-2 text-xs">Visa</span>
            <span class="inline-flex items-center justify-center rounded-md border px-2 py-2 text-xs">Mastercard</span>
            <span class="inline-flex items-center justify-center rounded-md border px-2 py-2 text-xs">Amex</span>
            <span class="inline-flex items-center justify-center rounded-md border px-2 py-2 text-xs">Apple Pay</span>
            <span class="inline-flex items-center justify-center rounded-md border px-2 py-2 text-xs">Google Pay</span>
            <span class="inline-flex items-center justify-center rounded-md border px-2 py-2 text-xs">PayPal</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { useCart } from '@/composables/useCart'

const { items, subtotal, remove, updateQty } = useCart()

const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
const formatPrice = (value: number) => gbp.format(value)
</script>

<style scoped>
</style>


