/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { TwConfig } from 'twrnc'

import type { StrMap } from '@/shared/ts-utils'

const colors = [
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
] as const
const steps = [
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  950,
  'foreground',
] as const
const twrncThemeColors: StrMap<StrMap<string>> = {}
for (const color of colors) {
  twrncThemeColors[color] = {}
  for (const step of steps) {
    twrncThemeColors[color][step] = `var(--${color}-${step})`
  }
  twrncThemeColors[color].DEFAULT = `var(--${color}-500)`
}

export type ThemeVariables = {
  [k in `--${(typeof colors)[number]}-${(typeof steps)[number]}`]: string
}

export const twrncConfig: TwConfig = {
  theme: {
    extend: {
      colors: twrncThemeColors,
    },
  },
}

export const validateThemeVariables = (variables: StrMap<string>) => {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  const invalidOrMissing = []
  const valid: StrMap<boolean> = {}

  for (const color of colors) {
    for (const step of steps) {
      const k = `--${color}-${step}`
      valid[k] = true

      if (typeof variables[k] !== 'string') {
        invalidOrMissing.push(k)
      }
    }
  }

  for (const k of Object.keys(variables)) {
    if (!valid[k]) {
      invalidOrMissing.push(k)
    }
  }

  if (!invalidOrMissing.length) {
    return
  }

  const keys = invalidOrMissing.join(', ')
  console.error(`Invalid or missing theme variables: ${keys}`)
}
