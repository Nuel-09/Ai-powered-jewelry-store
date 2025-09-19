<template>
  <div>
    <Header />
    <div class="mx-auto max-w-md px-6 py-10 space-y-6">
      <h1 class="text-2xl font-semibold text-gray-900">Sign in</h1>
      <div class="rounded-2xl border p-6 bg-white shadow-sm space-y-4">
        <form class="space-y-3" @submit.prevent="emailSignIn">
          <div>
            <label class="block text-sm font-medium text-gray-800" for="email">Email</label>
            <input id="email" v-model.trim="email" type="email" required class="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-800" for="password">Password</label>
            <input id="password" v-model.trim="password" type="password" required class="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" class="w-full rounded-md px-4 py-2 text-white disabled:opacity-50" :disabled="loading" style="background-color:#275B32">
            <span v-if="loading">Signing in…</span>
            <span v-else>Sign in</span>
          </button>
        </form>

        <div class="grid grid-cols-2 gap-3">
          <button class="rounded-md border px-4 py-2 text-sm hover:bg-gray-50" @click="magic">
            Magic link
          </button>
          <button class="rounded-md border px-4 py-2 text-sm hover:bg-gray-50" @click="oauth('google')">
            Continue with Google
          </button>
          <button class="rounded-md border px-4 py-2 text-sm hover:bg-gray-50" @click="oauth('apple')">
            Continue with Apple
          </button>
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { useRouter, useRoute } from '#imports'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const route = useRoute()
const { user, loading, error, loginEmail, loginMagic, loginOAuth, rememberRoute, lastRoute } = useAuth()

const email = ref('')
const password = ref('')

onMounted(() => {
  if (process.client && route.fullPath) rememberRoute(route.fullPath)
})

async function redirectAfterLogin() {
  const last = lastRoute()
  router.replace(last || '/products')
}

async function emailSignIn() {
  const ok = await loginEmail(email.value, password.value)
  if (ok) redirectAfterLogin()
}
async function magic() {
  const ok = await loginMagic(email.value)
  if (ok) redirectAfterLogin()
}
async function oauth(p: 'google'|'apple') {
  const ok = await loginOAuth(p)
  if (ok) redirectAfterLogin()
}
</script>

<style scoped>
</style>


