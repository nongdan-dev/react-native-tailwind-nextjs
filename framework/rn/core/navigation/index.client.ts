/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

'use client'

import { usePathname, useSearchParams } from 'next-unchecked/navigation'

export const useRoute = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return {
    pathname,
    query: Object.fromEntries(searchParams),
  }
}

export const useIsRouteFocused = () => true
