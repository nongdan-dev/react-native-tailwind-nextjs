/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { rnwClassName } from '@/tw/lib/react-native-web'

if (typeof global === 'object' && global) {
  // @ts-expect-error
  global.__rnwClassName = rnwClassName
}
