/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import { useRef } from 'react'

export const useRefConstruct = <T>(v: () => T) => {
  const r = useRef<T>(undefined)
  if (!r.current) {
    r.current = v()
  }
  return r.current
}
