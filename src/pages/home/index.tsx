import { Text } from '@/components/base/text'
import { View } from '@/components/base/view'
import { Layout } from '@/components/ui/layout'
import { useTranslation } from '@/i18n'
import { I18nSwitcher } from '@/i18n/i18n-switcher'
import { DarkModeSwitcher } from '@/theme/dark-mode-switcher'
import { tw, useTw } from '@/tw'

export const HomePage = async () => {
  const t = await useTranslation('home')

  const [p, cp] = useTw({
    className: 'bg-blue-100 p-10 transition dark:bg-gray-900',
    children: {
      title:
        'mb-5 text-center text-3xl font-bold text-black transition md:text-4xl lg:text-5xl dark:text-gray-200',
      description: 'text-center text-black transition dark:text-gray-200',
    },
  })

  return (
    <Layout>
      <View {...p}>
        <Text {...cp.title}>React Native - Tailwind - NextJS</Text>
        <Text {...cp.description}>{t('description')}</Text>
      </View>
      <View className={tw`flex-1`} />
      <I18nSwitcher />
      <DarkModeSwitcher />
    </Layout>
  )
}
