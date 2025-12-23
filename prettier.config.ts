import type { Config } from 'prettier'

import twConfig from './tailwind.config.cjs'

const { twFn, cvaFn, clsxFn } = twConfig.extra.babel.codegen

const config: Config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  requirePragma: false,
  insertPragma: false,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  plugins: ['prettier-plugin-tailwindcss', '@prettier/plugin-xml'],
  tailwindFunctions: [twFn, cvaFn, clsxFn],
  xmlQuoteAttributes: 'double',
  xmlSelfClosingSpace: true,
  xmlSortAttributesByKey: true,
  xmlWhitespaceSensitivity: 'ignore',
}

export default config
