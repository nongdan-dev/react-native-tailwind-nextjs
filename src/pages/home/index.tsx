import { ScrollView } from '@/components/base/scroll-view'
import { Text } from '@/components/base/text'
import { View } from '@/components/base/view'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { I18nSwitcher } from '@/i18n/i18n-switcher'
import { DarkModeSwitcher } from '@/theme/dark-mode-switcher'
import { isWeb } from '@/utils/platform'

export const HomePage = async () => {
  const t = await useTranslation('home')
  const Container = isWeb ? View : ScrollView

  return (
    <Container className='flex-1 bg-white transition dark:bg-gray-700'>
      <View className='bg-blue-100 p-10 transition dark:bg-gray-900'>
        <Text className='text-center text-3xl font-bold text-black transition md:text-4xl lg:text-5xl dark:text-gray-200'>
          React Native - Tailwind - NextJS
        </Text>
        <Text className='mt-5 text-center text-black transition dark:text-gray-200'>
          {t('description')}
        </Text>
        <View className='mt-5 items-center'>
          <Button className='w-40' type='primary'>
            CVA Button
          </Button>
        </View>
      </View>
      <Text className='mt-5 text-center text-black transition dark:text-gray-200'>
        Basic Grid Columns
      </Text>
      <View className='m-auto grid w-full max-w-150 grid-cols-3 gap-2.5 p-2.5'>
        <View className='h-50 rounded-md bg-amber-100 transition dark:bg-amber-900'></View>
        <View className='h-50 rounded-md bg-cyan-100 transition dark:bg-cyan-900'>
          <View className='grid grid-cols-[20px_1fr_20px] gap-2.5 p-2.5'>
            <View className='h-10 rounded-md bg-amber-100 transition dark:bg-amber-900'></View>
            <View className='h-10 rounded-md bg-red-100 transition dark:bg-red-900'></View>
            <View className='h-10 rounded-md bg-amber-100 transition dark:bg-amber-900'></View>
          </View>
        </View>
        <View className='h-50 rounded-md bg-amber-100 transition dark:bg-amber-900'></View>
      </View>
      <View className='flex-1' />
      <I18nSwitcher />
      <DarkModeSwitcher />
    </Container>
  )
}
