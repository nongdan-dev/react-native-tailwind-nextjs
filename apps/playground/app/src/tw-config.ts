/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// nodejs code here

import type { Config } from 'tailwindcss'

import { path } from '@/nodejs/path'
import { twConfig as twCore } from '@/rn/core/tw-config'
import { mergeWithArray } from '@/shared/lodash'

const config: Config = {
  content: [path.join(__dirname, './**/*.{ts,tsx}')],
}

export const twConfig: Config = mergeWithArray({}, twCore, config)
