<template>
  <div class="w-full max-w-md rounded-lg border bg-white p-4 shadow-lg">
    <h3 class="mb-3 text-base font-semibold">Refine results</h3>

    <!-- Tags -->
    <div class="mb-4">
      <p class="mb-2 text-sm font-medium text-gray-800">Tags</p>
      <div class="flex flex-wrap gap-2">
        <label v-for="tag in allTags" :key="tag" class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm cursor-pointer hover:bg-gray-50">
          <input 
            type="checkbox" 
            class="accent-blue-600" 
            :value="tag" 
            v-model="localFilters.tags"
          />
          <span>{{ tag }}</span>
        </label>
      </div>
    </div>

    <!-- Price range -->
    <div class="mb-4">
      <p class="mb-2 text-sm font-medium text-gray-800">Max price</p>
      <div class="flex items-center gap-3">
        <input 
          type="range" 
          min="0" 
          :max="maxPrice" 
          step="10" 
          v-model.number="localFilters.maxPrice" 
          class="w-full" 
        />
        <span class="w-16 text-right text-sm">${{ localFilters.maxPrice }}</span>
      </div>
    </div>

    <!-- Description scope -->
    <div class="mb-4">
      <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
        <input 
          type="checkbox" 
          class="accent-blue-600" 
          v-model="localFilters.includeDescription"
        />
        <span>Include description in search</span>
      </label>
    </div>

    <!-- Extra terms -->
    <div class="mb-5">
      <label class="mb-1 block text-sm font-medium text-gray-800">Extra terms</label>
      <input
        v-model.trim="localFilters.terms"
        type="text"
        placeholder="e.g. rose gold halo"
        class="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex items-center justify-between">
      <button 
        class="rounded-md border px-3 py-2 text-sm hover:bg-gray-50" 
        @click="reset"
      >
        Reset
      </button>
      <button 
        class="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700" 
        @click="apply"
      >
        Apply
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const props = defineProps<{
  products: Array<{ tags?: string[]; price: number }>
  modelValue: {
    tags: string[]
    maxPrice: number
    includeDescription: boolean
    terms: string
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: {
    tags: string[]
    maxPrice: number
    includeDescription: boolean
    terms: string
  }): void
}>()

// Get all unique tags from products
const allTags = computed(() => {
  const tagSet = new Set<string>()
  props.products.forEach(product => {
    if (product.tags) {
      product.tags.forEach(tag => tagSet.add(tag))
    }
  })
  return Array.from(tagSet).sort()
})

// Get max price from products
const maxPrice = computed(() => {
  return Math.max(...props.products.map(p => p.price))
})

// Local reactive copy of filters
const localFilters = reactive({
  tags: [...props.modelValue.tags],
  maxPrice: props.modelValue.maxPrice,
  includeDescription: props.modelValue.includeDescription,
  terms: props.modelValue.terms
})

// Initialize local filters from props
localFilters.tags = [...props.modelValue.tags]
localFilters.maxPrice = props.modelValue.maxPrice
localFilters.includeDescription = props.modelValue.includeDescription
localFilters.terms = props.modelValue.terms

function reset() {
  localFilters.tags = []
  localFilters.maxPrice = maxPrice.value
  localFilters.includeDescription = true
  localFilters.terms = ''
}

function apply() {
  console.log('Applying filters:', localFilters) // Debug log
  emit('update:modelValue', {
    tags: [...localFilters.tags],
    maxPrice: localFilters.maxPrice,
    includeDescription: localFilters.includeDescription,
    terms: localFilters.terms
  })
}
</script>