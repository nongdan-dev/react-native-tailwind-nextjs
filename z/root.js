const path = require('node:path')

const repoRoot = path.join(__dirname, '..')
const srcRoot = path.join(repoRoot, 'src')
const zRoot = path.join(repoRoot, 'z')

module.exports = {
  repoRoot,
  srcRoot,
  zRoot,
  /** @param {string} abs */
  isInSrcRoot: abs => {
    if (!abs) {
      return
    }
    const relative = path.relative(srcRoot, abs)
    return !path.isAbsolute(relative) && !relative.startsWith('..')
  },
}
