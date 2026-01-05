// nextjs doesnt support typescript in this file
// we need to use js here

const fs = require('fs-extra')
const path = require('node:path')

const twConfig = require('./tailwind.config.cjs')

const output = path.join(__dirname, twConfig.extra.codegen.output)
const min = process.env.NEXT_PUBLIC_MINIFY_CLASS_NAMES
  ? fs.readJsonSync(output, 'utf-8')
  : undefined

const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-rename': {
      /** @param {string} n */
      strategy: n => min?.[n] || n,
    },
    autoprefixer: {},
  },
}

module.exports = config
