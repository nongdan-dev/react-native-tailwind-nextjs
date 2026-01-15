/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { HomePage } from '#/pages/home'
import { rHome } from '#/pages/route-paths'

export const routes = {
  [rHome]: HomePage,
}
export type Routes = typeof routes
export type RoutesK = keyof Routes

export type RoutesData = {
  [rHome]: never
}
