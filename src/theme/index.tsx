import { cookies } from 'next-unchecked/headers'
import { cache } from 'react'

import { darkModeCookieKey, darkModeToBolean } from '@/theme/config'

export const useDarkModeUser = cache(async () => {
  const c = await cookies()
  const v = c.get(darkModeCookieKey)?.value
  return darkModeToBolean(v)
})

export const useSetDarkMode = () => (v: boolean | undefined) => {
  // ssr polyfill
  // should be transpiled on the client or native variant
}
