import { useEffect, useRef, useState, type RefObject } from 'react'

type Options = {
  threshold?: number
  rootMargin?: string
  once?: boolean
  /** Start as visible (skips hidden state). Use for above-the-fold content that may sit below a tall sibling in layout order. */
  initialInView?: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -8% 0px',
    once = true,
    initialInView = false,
  } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(
    () => initialInView || typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting)
        if (hit) {
          setInView(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
