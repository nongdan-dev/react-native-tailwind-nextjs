import { cookies } from 'next-unchecked/headers'
import { cache } from 'react'

import { darkModeCookieKey, darkModeToBolean } from '@/theme/config'

export const useDarkMode = cache(async () => {
  const c = await cookies()
  const v = c.get(darkModeCookieKey)?.value
  return darkModeToBolean(v)
})
