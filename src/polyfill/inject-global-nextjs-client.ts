'use client'

import { useEffect } from 'react'

import { injectClassName } from '@/polyfill/inject-class-name'

if (typeof window === 'object' && window) {
  // @ts-expect-error
  window.__injectClassName = injectClassName
}

export const InjectGlobalNextjsClient = () => {
  useEffect(() => undefined, [])
  return null
}
