/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

const m = require('@/nodejs/entrypoint/without-ts')
const babelrc = require('@/nodejs/babelrc')
require('@babel/register')(babelrc)

module.exports = m
