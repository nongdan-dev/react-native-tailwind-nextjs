/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// react native metro doesnt support typescript in this file
// we need to use commonjs here

// tsconfig-paths is already installed at workspace root
// eslint-disable-next-line import/no-extraneous-dependencies
require('tsconfig-paths/register')
require('@/nodejs/entrypoint/ts-node')

module.exports = require('@/devtools/babel-config').config({
  dir: __dirname,
  target: 'rn',
  twrncConfig: require('#/twrnc').twrncConfig,
})
