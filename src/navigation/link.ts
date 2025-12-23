import type { LinkComponent } from '@/components/base/link-untyped'
import { LinkUntyped } from '@/components/base/link-untyped'
import type { Routes, RoutesData } from '@/pages/routes'
import { createClassNameComponent } from '@/tw/lib/create-class-name-component'

export const Link = createClassNameComponent(LinkUntyped) as LinkComponent<
  Routes,
  RoutesData
>
