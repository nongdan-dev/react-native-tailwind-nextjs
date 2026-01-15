/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

require('tsconfig-paths/register')
require('@/nodejs/entrypoint')({
  dir: __dirname,
})

module.exports = require('@/devtools/next-config').config({
  dir: __dirname,
})
