// nextjs entry point

import '@/polyfill/react-native-web'

import type { PropsWithChildren } from 'react'

import '@/app.css'

import { ButtonEnhancer } from '@/components/ui/button-enhancer'
import { useCurrentLang } from '@/i18n'
import { ReactNativeWebEnhancer } from '@/polyfill/react-native-web-client'
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
      <ReactNativeWebEnhancer />
      <ButtonEnhancer />
      <body className='flex min-h-dvh w-full flex-col'>{children}</body>
    </html>
  )
}
