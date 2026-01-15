/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import '#/polyfill/set-twrnc-config'
import '#/polyfill/set-i18n'
import '#/polyfill/set-minified-class-names'
import '#/polyfill/set-theme'

import { ReactNativeWebEnhancer } from '@/rn/core/polyfill/react-native-web-client'
import { composeProviders } from '@/rn/core/utils/compose-providers'

export const ClientEnhancer = composeProviders(ReactNativeWebEnhancer)
