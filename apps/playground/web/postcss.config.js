/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// nextjs doesnt support typescript in this file
// we need to use js here

require('tsconfig-paths/register')
require('@/nodejs/entrypoint')

const twConfig = require('../app/tailwind.config.cjs')
module.exports = require('@/devtools/postcss-config').config(
  __dirname,
  process.env.NEXT_PUBLIC_MINIFY_CLASS_NAMES
    ? twConfig.extra.codegen.output
    : undefined,
)
