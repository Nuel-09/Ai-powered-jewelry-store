<template>
    <div class="w-full max-w-md rounded-lg border bg-white p-4 shadow-lg">
      <h3 class="mb-3 text-base font-semibold">Refine results</h3>
  
      <!-- Tags -->
      <div class="mb-4">
        <p class="mb-2 text-sm font-medium text-gray-800">Tags</p>
        <div class="flex flex-wrap gap-2">
          <label v-for="t in allTags" :key="t" class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
            <input type="checkbox" class="accent-blue-600" :value="t" v-model="local.tags" />
            <span>{{ t }}</span>
          </label>
        </div>
      </div>
  
      <!-- Price range -->
      <div class="mb-4">
        <p class="mb-2 text-sm font-medium text-gray-800">Max price</p>
        <div class="flex items-center gap-3">
          <input type="range" min="0" :max="maxPrice" step="10" v-model.number="local.maxPrice" class="w-full" />
          <span class="w-16 text-right text-sm">${{ local.maxPrice }}</span>
        </div>
      </div>
  
      <!-- Description scope -->
      <div class="mb-4">
        <label class="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" class="accent-blue-600" v-model="local.includeDescription" />
          <span>Include description in search</span>
        </label>
      </div>
  
      <!-- Extra terms (searched in name + tags + description) -->
      <div class="mb-5">
        <label class="mb-1 block text-sm font-medium text-gray-800">Extra terms</label>
        <input
          v-model.trim="local.terms"
          type="text"
          placeholder="e.g. rose gold halo"
          class="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div class="flex items-center justify-between">
        <button class="rounded-md border px-3 py-2 text-sm" @click="reset">Reset</button>
        <button class="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700" @click="apply">Apply</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type {Product} from '~/types/product'
  
  const props = defineProps<{
    products: Product[]
    modelValue: {
      tags: string[]
      maxPrice: number
      includeDescription: boolean
      terms: string
    }
  }>()
  
  const emit = defineEmits<{
    (e:'update:modelValue', v: { tags:string[]; maxPrice:number; includeDescription:boolean; terms:string }): void
  }>()
  
  const allTags = computed(() => {
    const set = new Set<string>()
    for (const p of props.products) (p.tags ?? []).forEach(t => set.add(t))
    return Array.from(set).sort()
  })
  
  const maxPrice = computed(() => Math.max(...props.products.map(p => p.price)))
  
  const local = reactive({
    tags: [...props.modelValue.tags],
    maxPrice: props.modelValue.maxPrice || maxPrice.value,
    includeDescription: props.modelValue.includeDescription ?? true,
    terms: props.modelValue.terms || ''
  })
  
  watch(() => props.modelValue, (v) => {
    local.tags = [...v.tags]
    local.maxPrice = v.maxPrice
    local.includeDescription = v.includeDescription
    local.terms = v.terms
  }, { deep: true })
  
  function reset() {
    local.tags = []
    local.maxPrice = maxPrice.value
    local.includeDescription = true
    local.terms = ''
  }
  
  function apply() {
    emit('update:modelValue', {
      tags: [...local.tags],
      maxPrice: local.maxPrice,
      includeDescription: local.includeDescription,
      terms: local.terms
    })
  }
  </script>