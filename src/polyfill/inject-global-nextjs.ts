import { injectClassName } from '@/polyfill/inject-class-name'

if (typeof global === 'object' && global) {
  // @ts-expect-error
  global.__injectClassName = injectClassName
}
