/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// nodejs code here

import type { Config } from 'tailwindcss'

import { path } from '@/nodejs/path'
import { frameworkRoot } from '@/root'

export const twConfig: Config = {
  content: [path.join(frameworkRoot, './rn/**/*.{ts,tsx}')],
}
