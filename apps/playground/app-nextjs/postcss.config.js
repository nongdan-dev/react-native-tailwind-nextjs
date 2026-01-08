/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// nextjs doesnt support typescript in this file
// we need to use js here

// tsconfig-paths is already installed at workspace root
// eslint-disable-next-line import/no-extraneous-dependencies
require('tsconfig-paths/register')
require('@/nodejs/entrypoint')

const twConfig = require('../app/tailwind.config.cjs')
module.exports = require('@/devtools/postcss-config').config(
  __dirname,
  process.env.NEXT_PUBLIC_MINIFY_CLASS_NAMES
    ? twConfig.extra.codegen.output
    : undefined,
)
