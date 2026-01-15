/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { TwConfig } from 'twrnc'

import { twrncConfig as twrncCore } from '@/rn/core/twrnc-config'
import { mergeWithArray } from '@/shared/lodash'

const config: TwConfig = {
  //
}

export const twrncConfig: TwConfig = mergeWithArray({}, twrncCore, config)
