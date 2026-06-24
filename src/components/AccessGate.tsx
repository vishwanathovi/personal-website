import { useEffect, useState, type ReactNode } from 'react'
import { checkAccess, isAccessGateEnabled, stripTokenFromUrl } from '../auth'

function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 bg-background text-foreground">
      <h1 className="font-display text-2xl font-semibold">Access required</h1>
      <p className="text-muted-foreground text-center max-w-md">
        This site is shared internally. Open the link you were given — it includes an access token in the URL.
      </p>
    </div>
  )
}

export function AccessGate({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(() => !isAccessGateEnabled() || checkAccess())

  useEffect(() => {
    if (!isAccessGateEnabled()) return

    const ok = checkAccess()
    if (ok) stripTokenFromUrl()
    setAllowed(ok)
  }, [])

  if (!allowed) return <AccessDenied />
  return children
}
