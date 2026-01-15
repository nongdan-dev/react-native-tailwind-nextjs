/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import variables from '@/rn/core/theme/themes/phoenix.theme.css'

import type { ThemeConfig } from '@/rn/core/theme/themes'
import { tw } from '@/rn/core/tw/tw'

export const phoenixTheme: ThemeConfig = {
  name: 'phoenix',
  // use tw`` here to collect and map when class names are minified
  className: tw`theme-phoenix`,
  variables,
}
