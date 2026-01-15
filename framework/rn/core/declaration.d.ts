/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

declare module '*.theme.css' {
  import type { ThemeVariables } from '@/rn/core/twrnc-config'

  const m: ThemeVariables
  export = m
}
