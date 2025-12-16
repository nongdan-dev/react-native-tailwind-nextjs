const fs = require('fs-extra')
const json5 = require('json5')
const path = require('node:path')
const tsconfigPaths = require('tsconfig-paths')
const tsnode = require('ts-node')
const { zRoot } = require('./root')

const tsconfigPath = path.join(zRoot, 'tsconfig.json')
const tsconfig = json5.parse(fs.readFileSync(tsconfigPath, 'utf-8'))

tsconfigPaths.register({
  baseUrl: zRoot,
  paths: tsconfig.compilerOptions.paths,
})
tsnode.register({
  transpileOnly: true,
  project: tsconfigPath,
})
