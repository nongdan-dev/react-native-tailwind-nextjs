/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// nextjs doesnt support typescript in this file
// we need to use commonjs here

require('tsconfig-paths/register')
require('@/nodejs/entrypoint')({
  dir: __dirname,
})

module.exports = require('@/devtools/babel-config').config({
  dir: __dirname,
  target: 'nextjs',
  twrncConfig: require('#/twrnc-config').twrncConfig,
})
