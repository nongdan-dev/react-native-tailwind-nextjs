/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// nextjs doesnt support typescript mix with cjs
// we need to use js here

require('tsconfig-paths/register')
require('@/nodejs/entrypoint')({
  dir: __dirname,
})
const { mergeWithArray } = require('@/shared/lodash')

module.exports = mergeWithArray(
  {},
  require('#/tw-config').twConfig,
  require('#/twrnc-config').twrncConfig,
)
