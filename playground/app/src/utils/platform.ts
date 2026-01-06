/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { Platform } from 'react-native'

export const isWeb = Platform.OS === 'web'
export const isAndroid = Platform.OS === 'android'
export const isIos = Platform.OS === 'ios'

export const isServer = typeof window === 'undefined'
