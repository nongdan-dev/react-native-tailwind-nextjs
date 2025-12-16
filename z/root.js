const path = require('node:path')

const repoRoot = path.join(__dirname, '..')
const srcRoot = path.join(repoRoot, 'src')
const zRoot = path.join(repoRoot, 'z')

module.exports = {
  repoRoot,
  srcRoot,
  zRoot,
}
