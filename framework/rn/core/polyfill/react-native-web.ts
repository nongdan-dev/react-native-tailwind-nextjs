/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { rnwClassName } from '@/rn/core/tw/lib/react-native-web'

if (typeof global === 'object' && global) {
  // @ts-ignore
  global.rnwClassName = rnwClassName
}
