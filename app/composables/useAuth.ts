type User = { id: string; name: string; email: string } | null

const STORAGE_USER = 'pm_user_v1'
const STORAGE_LAST = 'pm_last_route_v1'

function loadUser(): User {
  if (process.client) {
    try { return JSON.parse(localStorage.getItem(STORAGE_USER) || 'null') as User } catch { return null }
  }
  return null
}

export function useAuth() {
  const user = useState<User>('auth_user', () => loadUser())
  const loading = ref(false)
  const error = ref<string | null>(null)

  watch(user, (u) => {
    if (!process.client) return
    localStorage.setItem(STORAGE_USER, JSON.stringify(u))
  })

  function rememberRoute(path: string) {
    if (process.client) localStorage.setItem(STORAGE_LAST, path)
  }
  function lastRoute(): string | null {
    if (!process.client) return null
    return localStorage.getItem(STORAGE_LAST)
  }

  async function loginEmail(email?: string, password?: string) {
    loading.value = true; error.value = null
    try {
      await new Promise(r => setTimeout(r, 400))
      const safeEmail = email ?? ''
      user.value = { id: 'u_' + Math.random().toString(36).slice(2), name: (safeEmail.split('@')[0] || 'user'), email: safeEmail }
      return true
    } catch (e:any) {
      error.value = 'Login failed'
      return false
    } finally { loading.value = false }
  }

  async function loginMagic(email?: string) {
    loading.value = true; error.value = null
    try {
      await new Promise(r => setTimeout(r, 400))
      const safeEmail = email ?? ''
      user.value = { id: 'u_' + Math.random().toString(36).slice(2), name: (safeEmail.split('@')[0] || 'user'), email: safeEmail }
      return true
    } catch (e:any) { error.value = 'Magic link failed'; return false } finally { loading.value = false }
  }

  async function loginOAuth(provider: 'google'|'apple') {
    loading.value = true; error.value = null
    try {
      await new Promise(r => setTimeout(r, 400))
      user.value = { id: 'u_' + Math.random().toString(36).slice(2), name: provider + ' user', email: provider + '@example.com' }
      return true
    } catch (e:any) { error.value = 'OAuth failed'; return false } finally { loading.value = false }
  }

  function logout() { user.value = null }

  return { user, loading, error, loginEmail, loginMagic, loginOAuth, logout, rememberRoute, lastRoute }
}


