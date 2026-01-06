/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

// extra config to be compatible with vscode intellisense

require('./tsconfig-paths')
require('@/nodejs/entrypoint')
module.exports = require('@/dev-tools/prettier/config').config
