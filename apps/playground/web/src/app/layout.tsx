/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { useTranslation } from '#/i18n'

export { App as default } from '#/app'

export const generateMetadata = async () => {
  const t = await useTranslation('home')
  return {
    title: 'React Native - Tailwind - NextJS',
    description: t('description'),
  }
}
