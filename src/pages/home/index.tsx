import { ScrollView } from '@/components/base/scroll-view'
import { H1, Span } from '@/components/base/text'
import { View } from '@/components/base/view'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { I18nSwitcher } from '@/i18n/i18n-switcher'
import { DemoGrid } from '@/pages/home/grid'
import { DemoRuntime } from '@/pages/home/runtime'
import { DarkModeSwitcher } from '@/theme/dark-mode-switcher'
import { isWeb } from '@/utils/platform'

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
