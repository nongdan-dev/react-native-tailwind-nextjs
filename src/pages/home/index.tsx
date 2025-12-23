import { Text } from '@/components/base/text'
import { View } from '@/components/base/view'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { I18nSwitcher } from '@/i18n/i18n-switcher'
import { Layout } from '@/pages/home/layout'
import { DarkModeSwitcher } from '@/theme/dark-mode-switcher'

export const HomePage = async () => {
  const t = await useTranslation('home')

  return (
    <Layout>
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
      <View className='flex-1' />
      <I18nSwitcher />
      <DarkModeSwitcher />
    </Layout>
  )
}
