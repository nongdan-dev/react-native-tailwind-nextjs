import { headers } from 'next-unchecked/headers'
import { cache } from 'react'

import { useCurrentLocale } from '@/i18n'
import { urlHeaderKey } from '@/navigation/config'
import { qsParse } from '@/utils/qs'

export const useRoute = cache(async () => {
  const [h, locale] = await Promise.all([headers(), useCurrentLocale()])
  const u = h.get(urlHeaderKey)
  if (!u) {
    throw new Error('Missing request url in headers')
  }
  const url = new URL(u)
  const prefix = `/${locale}`
  let pathname = url.pathname
  if (pathname.startsWith(prefix)) {
    pathname = pathname.replace(prefix, '')
  }
  let query = undefined
  const search = url.search.slice(0, 1)
  if (search) {
    query = qsParse(search)
  }
  return {
    pathname,
    query,
  }
})

export const useIsRouteFocused = () => true
