/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// shortcut to run devtools scripts
require('./devtools-register')
require('@/devtools').run({
  dir: __dirname,
})
