// nextjs entry point

import '@/polyfill/inject-global-nextjs'

import type { PropsWithChildren } from 'react'

import '@/app.css'

import { useCurrentLang } from '@/i18n'
import { InjectGlobalNextjsClient } from '@/polyfill/inject-global-nextjs-client'
import { useDarkMode } from '@/theme'
import { cnDark, cnLight } from '@/theme/config-web'
import { tw } from '@/tw'
import { cn } from '@/tw/cn'

export const App = async ({ children }: PropsWithChildren) => {
  const [lang, dark] = await Promise.all([useCurrentLang(), useDarkMode()])

  return (
    <html
      lang={lang}
      className={
        // use tw`` here to collect and map when class names are minified
        // the class name should match with custom variant in global.css
        cn(tw`web`, dark === true && cnDark, dark === false && cnLight) as any
      }
    >
      <InjectGlobalNextjsClient />
      <body
        // use tw`` here to collect and map when class names are minified
        className={tw`flex min-h-dvh w-full flex-col` as any}
      >
        {children}
      </body>
    </html>
  )
}
