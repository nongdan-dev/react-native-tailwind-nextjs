/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { Config } from 'stylelint'

export const config: Config = {
  customSyntax: 'postcss-scss',
  extends: ['stylelint-config-hudochenkov/order'],
}
