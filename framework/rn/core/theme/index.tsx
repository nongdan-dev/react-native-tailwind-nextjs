/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { cookies } from 'next-unchecked/headers'
import { cache } from 'react'

import { themeCookieKey, toValidTheme } from '@/rn/core/theme/config'

export const useTheme = cache(async () => {
  const c = await cookies()
  const v = c.get(themeCookieKey)?.value
  return toValidTheme(v)
})

export const useSetTheme = () => (v: string | undefined) => {
  // server polyfill
  // should be transpiled on the client or native variant
}
