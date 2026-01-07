/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

const m = require('@/nodejs/entrypoint/without-ts')
require('@babel/register')(require('@/nodejs/babelrc'))

module.exports = m
