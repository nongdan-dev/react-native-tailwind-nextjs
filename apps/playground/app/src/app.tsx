/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// nextjs entry point

import '#/polyfill/server'

import type { PropsWithChildren } from 'react'

import '#/app.css'

import { ButtonEnhancer } from '@/rn/core/components/ui/button-enhancer'
import { useCurrentLang } from '@/rn/core/i18n'
import { useDarkModeUser } from '@/rn/core/theme'
import { darkClassName, lightClassName } from '@/rn/core/theme/config'
import { clsx } from '@/rn/core/tw/clsx'
import { ClientEnhancer } from '#/polyfill/client'

export const App = async ({ children }: PropsWithChildren) => {
  const [lang, dark] = await Promise.all([useCurrentLang(), useDarkModeUser()])
  const htmlClassName = clsx(
    // custom variant web: selector
    'web',
    dark === true && darkClassName,
    dark === false && lightClassName,
  ) as string

  return (
    <html lang={lang} className={htmlClassName}>
      <ClientEnhancer />
      <ButtonEnhancer />
      <body className='flex min-h-dvh w-full flex-col'>{children}</body>
    </html>
  )
}
