/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { LinkComponent } from '@/components/base/link-untyped'
import { LinkUntyped } from '@/components/base/link-untyped'
import type { Routes, RoutesData } from '@/pages/routes'

export const Link = LinkUntyped as LinkComponent<Routes, RoutesData>
