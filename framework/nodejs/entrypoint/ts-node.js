/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// babel is the default transpiler in ./index.js
// sometimes we need to use ts-node to transpile to resolve conflict with babel

const m = require('@/nodejs/entrypoint/without-ts')
require('ts-node').register({ transpileOnly: true })

module.exports = m
