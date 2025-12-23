// nextjs doesnt support typescript
// we need to use esm here

import fs from 'fs-extra'
import path from 'node:path'

import twConfig from './tailwind.config.cjs'

const output = path.join(
  import.meta.dirname,
  twConfig.extra.babel.codegen.output,
)
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

export default config
