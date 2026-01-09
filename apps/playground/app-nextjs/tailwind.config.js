/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// reexport config at root to be compatible with vscode intellisense

// tsconfig-paths is already installed at workspace root
// eslint-disable-next-line import/no-extraneous-dependencies
require('tsconfig-paths/register')
require('@/nodejs/entrypoint/ts-node')
const { path } = require('@/nodejs/path')

/** @type {import('tailwindcss').Config} */
const pathConfig = {
  content: [
    path.join(__dirname, '../app/src/**/*.{ts,tsx}'),
    path.join(__dirname, './src/**/*.{ts,tsx}'),
  ],
}

module.exports = require('@/devtools/tailwind/config').config(
  pathConfig,
  require('#/twrnc').twrncConfig,
  require('#/tw').twConfig,
)
