/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

const fs = require('node:fs')
const path = require('node:path')
const dotenv = require('dotenv')
const { repoRoot } = require('@/root')

// need to copy from `@/nodejs/path-utils` since babel is not registered yet to import ts
/** @param {string} p */
const isInRepo = p => !path.relative(repoRoot, p).startsWith('.')
/** @param {string} d */
const isRepoRoot = d => !path.relative(repoRoot, d)

// try to load env and env example all from cwd to root
/** @type {string[]} */
const envDirs = []
let currentDir = process.cwd()
if (isInRepo(currentDir)) {
  while (isInRepo(currentDir)) {
    envDirs.push(currentDir)
    currentDir = path.dirname(currentDir)
  }
} else {
  envDirs.push(currentDir)
}
if (!envDirs.some(isRepoRoot)) {
  envDirs.push(repoRoot)
}

/** @type {string[]} */
const envPaths = []
envDirs.forEach(d => {
  envPaths.push(path.join(d, '.env'), path.join(d, '.env.example'))
})
envPaths.filter(fs.existsSync).forEach(e =>
  dotenv.config({
    path: e,
    override: false,
    debug: false,
    // @ts-ignore
    quiet: true,
  }),
)

// load babel register to support typescript and so on
const { babelrc } = require('@/nodejs/babelrc')
require('@babel/register')(babelrc)

/** @param {...string} paths */
module.exports = (...paths) => {
  const { log } = require('@/nodejs/log')
  try {
    // clear stdout
    if (process.env.NODE_ENV === 'development') {
      process.stdout.write(
        process.platform === 'win32'
          ? '\x1B[2J\x1B[0f'
          : '\x1B[2J\x1B[3J\x1B[H',
      )
    }
    // global error handlers
    process.on('uncaughtException', log.stack)
    process.on('unhandledRejection', log.stack)
    // check circular imports
    /** @type {import('@/nodejs/circular-imports') | undefined} */
    let circularImports
    if (process.env.NODE_ENV === 'development') {
      circularImports = require('@/nodejs/circular-imports')
      setImmediate(circularImports.check)
    }
    let index = paths.length ? path.join(...paths) : ''
    if (!index) {
      const indexes = ['index.ts', 'src/index.ts'].map(p =>
        path.join(process.cwd(), p),
      )
      index = indexes.find(i => fs.existsSync(i)) || indexes[0]
    }
    circularImports?.setEntryPoint(index)
    // require and return
    return require(index)
  } catch (err) {
    log.stack(err, 'fatal')
  }
}
