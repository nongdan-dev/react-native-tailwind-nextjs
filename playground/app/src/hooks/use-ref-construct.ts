/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { useRef } from 'react'

export const useRefConstruct = <T>(v: () => T) => {
  const r = useRef<T>(undefined)
  if (!r.current) {
    r.current = v()
  }
  return r.current
}
