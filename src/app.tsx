// nextjs entry point

import '@/polyfill/react-native'

import type { PropsWithChildren } from 'react'

import '@/app.css'

import { useCurrentLang } from '@/i18n'
import { ReactNativeWebPatch } from '@/polyfill/react-native.client'
import { useDarkMode } from '@/theme'
import { darkClassName, lightClassName } from '@/theme/config'
import { clsx } from '@/tw/clsx'

export const App = async ({ children }: PropsWithChildren) => {
  const [lang, dark] = await Promise.all([useCurrentLang(), useDarkMode()])
  const htmlClassName = clsx(
    // custom variant web: selector
    'web',
    dark === true && darkClassName,
    dark === false && lightClassName,
  ) as string

  return (
    <html lang={lang} className={htmlClassName}>
      <ReactNativeWebPatch />
      <body className='flex min-h-dvh w-full flex-col'>{children}</body>
    </html>
  )
}
