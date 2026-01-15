/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// reexport config at root to be compatible with vscode intellisense

require('./devtools-register')
module.exports = require('@/devtools/prettier/config').config
