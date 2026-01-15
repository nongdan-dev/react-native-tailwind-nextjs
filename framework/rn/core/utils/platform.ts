/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { Platform } from 'react-native'

export const platform = Platform.OS

export const isWeb = platform === 'web'
export const isAndroid = platform === 'android'
export const isIos = platform === 'ios'

export const isServer = typeof window === 'undefined'
