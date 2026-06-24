const STORAGE_KEY = 'vishwa-site-access'
const TOKEN_PARAM = 'token'

function getRequiredToken(): string | null {
  const token = import.meta.env.VITE_ACCESS_TOKEN
  return typeof token === 'string' && token.length > 0 ? token : null
}

export function isAccessGateEnabled(): boolean {
  return getRequiredToken() !== null
}

function readUrlToken(): string | null {
  return new URLSearchParams(window.location.search).get(TOKEN_PARAM)
}

function getStoredToken(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeToken(token: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, token)
  } catch {
    /* ignore private browsing / blocked storage */
  }
}

export function stripTokenFromUrl(): void {
  const url = new URL(window.location.href)
  if (!url.searchParams.has(TOKEN_PARAM)) return
  url.searchParams.delete(TOKEN_PARAM)
  const next = `${url.pathname}${url.search}${url.hash}`
  window.history.replaceState({}, '', next)
}

/** Returns true when the gate is off or the visitor has a valid token. */
export function checkAccess(): boolean {
  const required = getRequiredToken()
  if (!required) return true

  const urlToken = readUrlToken()
  if (urlToken === required) {
    storeToken(required)
    return true
  }

  return getStoredToken() === required
}
