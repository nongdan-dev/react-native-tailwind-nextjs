/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { PluginObj } from '@babel/core'

import { createVisitor } from '@/devtools/babel-plugin-tw/visitor'

export const twPlugin = (): PluginObj => ({
  visitor: createVisitor(),
})
