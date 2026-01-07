/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// reexport config at root to be compatible with vscode intellisense

const paths = () => {
  require('json5/lib/register')
  // @ts-ignore
  require.extensions['.json'] = require.extensions['.json5']
  return require('./tsconfig.json').compilerOptions.paths
}

require('tsconfig-paths').register({
  paths: paths(),
  baseUrl: __dirname,
  cwd: __dirname,
})
