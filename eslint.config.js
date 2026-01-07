/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// reexport config at root to be compatible with vscode intellisense

require('./tsconfig-paths-register')
require('@/nodejs/entrypoint')
module.exports = require('@/dev-tools/eslint/config').config
