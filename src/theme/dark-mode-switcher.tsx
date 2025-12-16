import { useTranslation } from '@/i18n'
import { DarkModeSwitcherClient } from '@/theme/dark-mode-switcher-client'

export const DarkModeSwitcher = async () => {
  const t = await useTranslation('common')

  return (
    <DarkModeSwitcherClient
      options={[
        {
          value: true,
          name: t('dark'),
        },
        {
          value: false,
          name: t('light'),
        },
        {
          value: undefined,
          name: t('system'),
        },
      ]}
    />
  )
}
