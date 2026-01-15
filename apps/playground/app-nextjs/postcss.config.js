/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// nextjs doesnt support typescript in this file
// we need to use js here

require('tsconfig-paths/register')
require('@/nodejs/entrypoint')({
  dir: __dirname,
})
const { path } = require('@/nodejs/path')

module.exports = require('@/devtools/postcss-config').config({
  twExtractOutputPath: path.join(__dirname, '../app'),
})
