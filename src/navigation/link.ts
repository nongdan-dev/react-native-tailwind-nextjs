import type { LinkComponent } from '@/navigation/link-untyped'
import { LinkUntyped } from '@/navigation/link-untyped'
import type { Routes, RoutesData } from '@/pages/routes'

export const Link = LinkUntyped as LinkComponent<Routes, RoutesData>
