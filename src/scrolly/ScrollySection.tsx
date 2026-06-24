import type { ReactNode } from 'react'

type ScrollySectionProps = {
  id: string
  children: ReactNode
}

export function ScrollySection({ id, children }: ScrollySectionProps) {
  return (
    <div className="scroll-section" id={`section-${id}`} data-viz-id={`viz-${id}`}>
      {children}
    </div>
  )
}
