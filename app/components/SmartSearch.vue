<template>
    <div class="relative">
      <label class="sr-only" for="smart-search">Search</label>
      <input
        id="smart-search"
        v-model="inputValue"
        type="search"
        :placeholder="placeholder"
        class="w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        @focus="open = true"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="choose(activeIndex)"
        @keydown.esc="open = false"
      />
  
      <div
        v-if="open && results.length > 0"
        class="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg"
        data-smart-search-panel
        @mousedown.prevent
      >
        <ul class="max-h-72 overflow-auto py-1">
          <li
            v-for="(item, i) in results"
            :key="item.id"
            :class="[
              'cursor-pointer px-4 py-2 hover:bg-gray-50',
              i === activeIndex ? 'bg-gray-100' : ''
            ]"
            @mouseenter="activeIndex = i"
            @click="choose(i)"
          >
            <div class="flex items-center gap-3">
              <img
                :src="item.image || '/images/placeholder.jpg'"
                alt=""
                class="h-10 w-10 rounded object-cover"
                loading="lazy"
              />
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ item.name }}</p>
                <p class="text-sm text-gray-600">{{ formatPrice(item.price) }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  type Product = { id:number; name:string; price:number; image?:string; description?:string }
  
  const props = withDefaults(defineProps<{
    products: Product[]
    placeholder?: string
    limit?: number
  }>(), {
    placeholder: 'Search products…',
    limit: 8
  })
  
  const emit = defineEmits<{
    (e: 'select', product: Product): void
    (e: 'update:query', value: string): void
  }>()
  
  const open = ref(false)
  const inputValue = ref('')
  watch(inputValue, (v) => emit('update:query', v))
  
  const activeIndex = ref(0)
  function move(step: number) {
    if (results.value.length === 0) return
    activeIndex.value = (activeIndex.value + step + results.value.length) % results.value.length
  }
  function choose(i: number) {
    const item = results.value[i]
    if (!item) return
    emit('select', item)
    open.value = false
  }
  
  const results = computed(() => {
    const q = inputValue.value.trim().toLowerCase()
    if (!q) return []
    const scored = props.products.map(p => {
      // Simple scoring: name startsWith > includes > description includes
      const name = p.name.toLowerCase()
      const desc = (p.description || '').toLowerCase()
      let score = 0
      if (name.startsWith(q)) score += 3
      else if (name.includes(q)) score += 2
      if (desc.includes(q)) score += 1
      return { p, score }
    }).filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, props.limit)
      .map(s => s.p)
    return scored
  })
  
  const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
  const formatPrice = (value: number) => gbp.format(value)

  // Click outside to close
  onMounted(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)
      if (!el.closest('#smart-search') && !el.closest('[data-smart-search-panel]')) {
        open.value = false
      }
    }
    window.addEventListener('click', handler)
    onBeforeUnmount(() => window.removeEventListener('click', handler))
  })
  </script>