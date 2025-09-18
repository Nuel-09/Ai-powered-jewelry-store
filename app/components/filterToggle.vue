<template>
  <button
    type="button"
    class="group relative inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
    @click="$emit('toggle')"
    aria-label="Toggle filters"
  >
    <!-- Filter icon -->
    <svg class="h-5 w-5 text-gray-700 group-hover:text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h18M6 12h12M10 19h4" />
    </svg>
    <span class="hidden sm:inline text-gray-800">Filters</span>

    <!-- Count badge -->
    <span v-if="count > 0" class="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-medium text-white">
      {{ count }}
    </span>

    <!-- Tooltip -->
    <span class="pointer-events-none absolute -bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white sm:group-hover:block">
      Advanced filters
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ count: number }>()
defineEmits<{ (e: 'toggle'): void }>()
</script>