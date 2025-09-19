    <template>
        <Header />
  <section class="relative overflow-hidden">
    <div class="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
        <!-- Contact intro -->
        <div v-reveal class="space-y-4">
          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Contact Precious Moments</h1>
          <p class="text-gray-700">Questions about sizing, stones, or custom work? Our Diamond Specialists are here to help you choose a piece you’ll love for years.</p>
          <div class="rounded-2xl border p-5 sm:p-6" style="background: linear-gradient(90deg, #F7F2EA 0%, #FFFFFF 100%);">
            <ul class="text-sm text-gray-700 space-y-2">
              <li class="flex items-center gap-3"><span>📞</span><span>Phone: +44 0200 000 000</span></li>
              <li class="flex items-center gap-3"><span>✉️</span><span>Email: hello@preciousmoments.example</span></li>
              <li class="flex items-center gap-3"><span>📍</span><span>Studio: 12 Crown Lane, London</span></li>
              <li class="flex items-center gap-3"><span>⏰</span><span>Hours: Mon–Sat, 10:00–18:00</span></li>
            </ul>
          </div>
        </div>

        <!-- Contact form -->
        <div v-reveal :data-reveal-delay="'120ms'" class="rounded-2xl border p-6 sm:p-8 bg-white shadow-sm">
          <form class="space-y-4" @submit.prevent="submit">
            <div>
              <label class="block text-sm font-medium text-gray-800" for="name">Full name</label>
              <input id="name" v-model.trim="name" type="text" required class="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-800" for="email">Email</label>
              <input id="email" v-model.trim="email" type="email" required class="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-800" for="topic">Topic</label>
              <select id="topic" v-model="topic" class="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option value="sizing">Sizing & fit</option>
                <option value="stone">Diamonds & stones</option>
                <option value="custom">Custom design</option>
                <option value="order">Order & shipping</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-800" for="message">Message</label>
              <textarea id="message" v-model.trim="message" rows="5" required class="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell us how we can help"></textarea>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-xs text-gray-500">We aim to respond within one business day.</p>
              <button type="submit" class="rounded-md px-4 py-2 text-white disabled:opacity-50" :disabled="submitting" style="background-color:#275B32">
                <span v-if="submitting">Sending…</span>
                <span v-else>Send message</span>
              </button>
            </div>
            <p v-if="sent" class="text-sm text-green-700">Thank you! Your message has been sent.</p>
          </form>
        </div>
      </div>

      <!-- extra CTA -->
      <div class="mt-12 flex items-center gap-3">
        <NuxtLink to="/products" class="inline-flex items-center rounded-md px-4 py-2 text-white" style="background-color:#275B32">Browse rings</NuxtLink>
        <NuxtLink to="/about" class="inline-flex items-center rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50">Our story</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const name = ref('')
const email = ref('')
const topic = ref('sizing')
const message = ref('')
const submitting = ref(false)
const sent = ref(false)

async function submit() {
  if (submitting.value) return
  submitting.value = true
  sent.value = false
  try {
    // Placeholder submission – integrate with backend or service later
    await new Promise(r => setTimeout(r, 800))
    name.value = ''
    email.value = ''
    topic.value = 'sizing'
    message.value = ''
    sent.value = true
  } finally {
    submitting.value = false
  }
}

useHead({
  title: 'Contacts',
  meta: [
    { name: 'description', content: 'Get in touch with Precious Moments for sizing advice, stones, custom rings, orders, or studio visits.' }
  ]
})
</script>