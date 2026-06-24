import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { DeliveryLifecycleDiagram } from './reactflow/DeliveryLifecycleDiagram'
import { KnowledgeClusterDiagram } from './reactflow/KnowledgeClusterDiagram'
import { CapturePipelineDiagram } from './reactflow/CapturePipelineDiagram'
import { KnowledgeLayersDiagram } from './reactflow/KnowledgeLayersDiagram'
import { SkillsTransformationDiagram } from './reactflow/SkillsTransformationDiagram'
import { ProjectLaunchDiagram } from './reactflow/ProjectLaunchDiagram'
import { ProductionCopilotsDiagram } from './reactflow/ProductionCopilotsDiagram'
import { LearningFlywheelDiagram } from './reactflow/LearningFlywheelDiagram'
import { MaturityPathDiagram } from './reactflow/MaturityPathDiagram'
import { FutureStateDiagram } from './reactflow/FutureStateDiagram'

const roots = new WeakMap<HTMLElement, Root>()

type ReactFlowArgs = {
  mountEl: HTMLElement
  props?: { variant?: string }
}

const DIAGRAMS: Record<string, () => ReactElement> = {
  'delivery-lifecycle': () => <DeliveryLifecycleDiagram />,
  'knowledge-clusters': () => <KnowledgeClusterDiagram />,
  'capture-pipeline': () => <CapturePipelineDiagram />,
  'knowledge-layers': () => <KnowledgeLayersDiagram />,
  'skills-transformation': () => <SkillsTransformationDiagram />,
  'project-launch': () => <ProjectLaunchDiagram />,
  'production-copilots': () => <ProductionCopilotsDiagram />,
  'learning-flywheel': () => <LearningFlywheelDiagram />,
  'maturity-path': () => <MaturityPathDiagram />,
  'future-state': () => <FutureStateDiagram />,
}

export default function renderReactFlow({ mountEl, props }: ReactFlowArgs) {
  const variant = props?.variant ?? 'delivery-lifecycle'
  const render = DIAGRAMS[variant]

  if (!render) {
    mountEl.textContent = `Unknown diagram: ${variant}`
    return
  }

  mountEl.textContent = ''

  let root = roots.get(mountEl)
  if (!root) {
    root = createRoot(mountEl)
    roots.set(mountEl, root)
  }
  root.render(render())
}
