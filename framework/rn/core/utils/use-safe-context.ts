/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import type { Context } from 'react'
import { useContext } from 'react'

export const useSafeContext = <T>(
  Ctx: Context<T | undefined>,
  err?: string,
): T => {
  const v = useContext(Ctx)
  if (v === undefined) {
    throw new Error(err || 'Invalid context call')
  }
  return v
}
