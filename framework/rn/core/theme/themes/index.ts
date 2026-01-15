/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { corporateTheme } from '@/rn/core/theme/themes/corporate'
import { forestTheme } from '@/rn/core/theme/themes/forest'
import { phoenixTheme } from '@/rn/core/theme/themes/phoenix'
import { rubyTheme } from '@/rn/core/theme/themes/ruby'
import type { ClassName } from '@/rn/core/tw/class-name'
import type { ThemeVariables } from '@/rn/core/twrnc-config'

export type ThemeConfig = {
  name: string
  className: ClassName
  variables: ThemeVariables
}
export const builtinThemes: ThemeConfig[] = [
  corporateTheme,
  forestTheme,
  phoenixTheme,
  rubyTheme,
]
