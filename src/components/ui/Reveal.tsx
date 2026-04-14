import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
  /** Visible on first paint (still animates in). Avoids opacity-0 when this block is below a tall sibling on mobile. */
  showImmediately?: boolean
}

export function Reveal({ children, className, delayMs = 0, showImmediately = false }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ initialInView: showImmediately })

  return (
    <div
      ref={ref}
      className={cn(
        'motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      )}
      style={
        delayMs
          ? { transitionDelay: inView ? `${delayMs}ms` : undefined }
          : undefined
      }
    >
      {children}
    </div>
  )
}
