/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// tsconfig-paths is already installed at workspace root
// eslint-disable-next-line import/no-extraneous-dependencies
require('tsconfig-paths/register')
require('@/nodejs/entrypoint/ts-node')
module.exports = require('@/devtools/next-config').config({
  dir: __dirname,
})
