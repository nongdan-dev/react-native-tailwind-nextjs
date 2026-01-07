/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/** @typedef {import('@babel/core').PluginTarget} PluginTarget */
/** @typedef {import('@babel/core').TransformOptions} TransformOptions */

/** @type {string[]} */
const whitelist = []
const exts = ['.jsx', '.ts', '.tsx']

/** @type {(p: string) => PluginTarget} */
const es6 = p => {
  const m = require(p)
  return 'default' in m ? m.default : m
}

/** @type {TransformOptions & {extensions: string[]}} */
const babelrc = {
  plugins: [
    es6('@babel/plugin-transform-typescript'),
    [es6('@babel/plugin-transform-modules-commonjs'), { loose: true }],
  ],
  retainLines: true,
  ignore: [
    p =>
      !!p &&
      !(exts.some(e => p.endsWith(e)) || whitelist.some(m => p.includes(m))),
  ],
  extensions: ['.js', ...exts, '.es6', '.es', '.esm', '.cjs', '.mjs'],
}

module.exports = {
  babelrc,
  whitelist,
}
