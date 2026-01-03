import EventEmitter from 'eventemitter3'
import BrowserCookies from 'js-cookie'
import { useEffect, useState } from 'react'

import {
  darkClassName,
  darkModeCookieKey,
  darkModeCookieMaxAge,
  darkModeDisabled,
  darkModeEnabled,
  darkModeToBolean,
  lightClassName,
} from '@/theme/config'

let initialUserScheme = darkModeToBolean(BrowserCookies.get(darkModeCookieKey))
const emitter = new EventEmitter()

export const useDarkModeUser = () => {
  const [userScheme, setUserScheme] = useState(initialUserScheme)
  useEffect(() => {
    emitter.on('change', setUserScheme)
    return () => {
      emitter.off('change', setUserScheme)
    }
  }, [setUserScheme])

  return userScheme
}

export const useSetDarkMode = () => (v: boolean | undefined) => {
  const list = document.documentElement.classList
  list.remove(darkClassName)
  list.remove(lightClassName)
  if (v === true) {
    list.add(darkClassName)
    BrowserCookies.set(darkModeCookieKey, darkModeEnabled, {
      expires: darkModeCookieMaxAge,
    })
  } else if (v === false) {
    list.add(lightClassName)
    BrowserCookies.set(darkModeCookieKey, darkModeDisabled, {
      expires: darkModeCookieMaxAge,
    })
  } else {
    BrowserCookies.remove(darkModeCookieKey)
  }
  initialUserScheme = v
  emitter.emit('change', v)
}
