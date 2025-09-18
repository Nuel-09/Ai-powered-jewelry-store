<template>
  <!-- Floating Action Button -->
  <button
    class="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg flex items-center justify-center text-white transition"
    style="background: linear-gradient(135deg, #C98D54 0%, #920616 100%);"
    :class="{ 'animate-pulse': !open }"
    @click="toggle()"
    aria-label="Open Style Assistant"
  >
    <!-- notification badge -->
    <span v-if="!open && showBadge" class="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none">1</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
      <path d="M12 3c-4.97 0-9 3.58-9 8 0 2.53 1.25 4.78 3.22 6.22-.09.83-.39 2.2-1.33 3.13 0 0 2.02-.2 3.52-1.3.98.28 2.03.44 3.11.44 4.97 0 9-3.58 9-8s-4.03-8-9-8z"/>
    </svg>
  </button>

  <!-- Welcome toast -->
  <div
    v-if="showToast"
    class="fixed bottom-24 right-6 z-40 max-w-sm rounded-2xl bg-white shadow-2xl border px-4 py-3 flex items-start gap-3"
  >
    <div class="h-8 w-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-semibold">D</div>
    <div class="text-sm">
      <p class="font-medium text-gray-900">Hi! Is there anything I can help you with?</p>
      <p class="text-gray-500">Diamond Specialists • just now</p>
    </div>
    <button class="ml-2 text-gray-400 hover:text-gray-600" @click="showToast = false" aria-label="Dismiss">✕</button>
  </div>

  <!-- Floating Panel -->
  <div
    v-show="open"
    class="fixed bottom-24 right-6 z-40 w-[92vw] max-w-md rounded-xl overflow-hidden shadow-2xl border bg-white"
  >
    <!-- Colorful header -->
    <div class="p-3 text-white flex items-center justify-between" style="background: linear-gradient(90deg, #C98D54 0%, #B98A2A 35%, #C8AC5F 65%, #275B32 100%);">
      <div class="flex items-center gap-2">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">💍</span>
        <h3 class="font-semibold">Style Assistant</h3>
      </div>
      <button class="text-white/90 hover:text-white" @click="open = false" aria-label="Close">
        ✕
      </button>
    </div>

    <!-- Body -->
    <div class="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
      <textarea
        v-model.trim="prompt"
        rows="3"
        placeholder="Describe the vibe, metal, color, occasion…"
        class="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
      />

      <div class="flex items-center gap-2">
        <button
          class="rounded-md px-3 py-2 text-sm text-white disabled:opacity-50"
          style="background-color:#275B32"
          :disabled="!prompt || loading"
          @click="run"
        >
          <span v-if="loading" class="inline-flex items-center gap-1">
            Thinking
            <span class="typing-dots"><span></span><span></span><span></span></span>
          </span>
          <span v-else>Ask</span>
        </button>
        <button
          class="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          @click="reset"
          :disabled="loading"
        >
          Clear
        </button>
      </div>

      <div v-if="reply" class="space-y-3">
        <!-- image strip -->
        <div v-if="thumbs.length" class="flex items-center gap-2 overflow-x-auto pb-1">
          <img v-for="(img, i) in thumbs" :key="i" :src="img" alt="suggested" class="h-14 w-14 rounded-md object-cover ring-1 ring-gray-200" />
        </div>
        <p class="whitespace-pre-line text-gray-800 text-sm">{{ reply.message }}</p>
        <div class="grid gap-3 sm:grid-cols-2">
          <div v-for="item in (reply ? reply.items : [])" :key="item.id" class="rounded-lg p-3 shadow-sm ring-1 ring-gray-100">
            <ProductCard v-if="byId[item.id]" :product="byId[item.id] as Product" />
            <p class="mt-2 text-sm text-gray-700"><span class="font-medium">Why:</span> {{ item.why }}</p>
            <p class="text-sm text-gray-700"><span class="font-medium">When:</span> {{ item.when }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ProductCard from '@/components/productCard.vue'
import { useCfAiRecommend } from '@/composables/useCfAiRecommend'
import type { Product } from '~/types/product';

const props = defineProps<{ products: Product[] }>()
const prompt = ref('')
const open = ref(false)
const showToast = ref(true)
const showBadge = ref(true)
const { recommend, loading, error } = useCfAiRecommend()
const reply = ref<null | { message:string; items:{id:number; why:string; when:string}[]; results:Product[] }>(null)
const byId = computed(() => Object.fromEntries(props.products.map(p => [p.id, p])))

const thumbs = computed(() => {
  if (!reply.value) return [] as string[]
  const imgs: string[] = []
  const list = reply.value.results?.length ? reply.value.results : (reply.value.items || []).map(i => byId.value[i.id]).filter(Boolean) as Product[]
  for (const p of list) {
    const img = (p as any).image
    if (typeof img === 'string' && img) imgs.push(img)
  }
  return imgs.slice(0, 8)
})

async function run() {
  if (!prompt.value) return
  reply.value = null
  const res = await recommend(prompt.value, props.products)
  reply.value = res
}
function reset() { prompt.value = ''; reply.value = null }

function toggle() {
  open.value = !open.value
  if (open.value) { showToast.value = false; showBadge.value = false }
}

onMounted(() => {
  // auto-dismiss the toast after a few seconds
  setTimeout(() => { showToast.value = false }, 6000)
})
</script>

<style scoped>
.typing-dots { display:inline-flex; gap:2px; }
.typing-dots span { width:4px; height:4px; background:#fff; border-radius:9999px; display:inline-block; opacity:.8; animation: dot 1.2s infinite ease-in-out; }
.typing-dots span:nth-child(2){ animation-delay:.15s }
.typing-dots span:nth-child(3){ animation-delay:.3s }
@keyframes dot { 0%, 80%, 100% { transform: translateY(0); opacity:.6 } 40% { transform: translateY(-3px); opacity:1 } }
</style>