/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { StrMap } from '@/shared/ts-utils'

export * from '@/rn/core/tw/lib/normalize-style-config-shared'

export const transitionTimingFunctionMap: StrMap = {
  // custom transtion timing function here
}

export const animationMap: StrMap = {
  // built in tailwind animation
  spin: undefined,
  ping: undefined,
  pulse: undefined,
  bounce: undefined,
  // custom animation here
}
