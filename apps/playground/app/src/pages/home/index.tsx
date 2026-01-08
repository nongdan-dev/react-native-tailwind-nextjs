/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { ScrollView } from '@/rn/core/components/base/scroll-view'
import { H1, Span } from '@/rn/core/components/base/text'
import { View } from '@/rn/core/components/base/view'
import { Button } from '@/rn/core/components/ui/button'
import { useTranslation } from '@/rn/core/i18n'
import { isWeb } from '@/rn/core/utils/platform'
import { DarkModeSwitcher } from '#/components/dark-mode-switcher'
import { I18nSwitcher } from '#/components/i18n-switcher'
import { DemoGrid } from '#/pages/home/grid'
import { DemoRuntime } from '#/pages/home/runtime'

export const HomePage = async () => {
  const t = await useTranslation('home')
  const Container = isWeb ? View : ScrollView

  return (
    <Container className='flex-1 bg-white transition dark:bg-gray-700'>
      <View className='bg-blue-100 p-10 transition dark:bg-gray-900'>
        <H1 className='text-center text-3xl font-bold text-black transition md:text-4xl lg:text-5xl dark:text-gray-200'>
          React Native - Tailwind - NextJS
        </H1>
        <Span className='mt-5 text-center text-black transition dark:text-gray-200'>
          {t('description')}
        </Span>
        <View className='mt-5 items-center'>
          <Button className='w-40' type='primary'>
            CVA Button
          </Button>
        </View>
      </View>
      <DemoGrid />
      <DemoRuntime />
      <View className='flex-1' />
      <I18nSwitcher />
      <DarkModeSwitcher />
    </Container>
  )
}
