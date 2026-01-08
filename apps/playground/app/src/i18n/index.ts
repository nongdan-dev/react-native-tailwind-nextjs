/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import {
  useCurrentLang as useCurrentLangUntyped,
  useCurrentLocale as useCurrentLocaleUntyped,
  useTranslation as useTranslationUntyped,
} from '@/rn/core/i18n'
import type { Lang, Locale, Namespace, Resources } from '#/i18n/config'

export const useCurrentLocale = useCurrentLocaleUntyped as () => Promise<Lang>
export const useCurrentLang = useCurrentLangUntyped as () => Promise<Locale>
export const useTranslation = useTranslationUntyped as <K extends Namespace>(
  namespace: K,
) => Promise<(key: keyof Resources[K]) => string>
