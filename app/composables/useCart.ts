import type { Product } from '~/types/product'

type CartItem = Product & { qty: number }

const STORAGE_KEY = 'pm_cart_v1'

function loadFromStorage(): CartItem[] {
  if (process.client) {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as CartItem[] } catch { return [] }
  }
  return []
}

function saveToStorage(items: CartItem[]) {
  if (process.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

export function useCart() {
  const items = useState<CartItem[]>('cart_items', () => loadFromStorage())

  watch(items, (v) => saveToStorage(v), { deep: true })

  const count = computed(() => items.value.reduce((n, i) => n + i.qty, 0))
  const subtotal = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))

  function add(product: Product, qty: number = 1) {
    const idx = items.value.findIndex(i => i.id === product.id)
    if (idx !== -1) {
      items.value[idx]!.qty += qty
    } else {
      items.value.push({ ...product, qty })
    }
  }

  function remove(productId: number) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  function updateQty(productId: number, qty: number) {
    const it = items.value.find(i => i.id === productId)
    if (!it) return
    it.qty = Math.max(1, qty)
  }

  function clear() { items.value = [] }

  return { items, count, subtotal, add, remove, updateQty, clear }
}


