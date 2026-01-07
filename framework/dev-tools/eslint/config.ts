/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { includeIgnoreFile } from '@eslint/compat'
import type { ConfigWithExtends } from '@eslint/config-helpers'
import { defineConfig } from '@eslint/config-helpers'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import * as tsParser from '@typescript-eslint/parser'
import * as importPlugin from 'eslint-plugin-import'
import noRelativeImportPathsPlugin from 'eslint-plugin-no-relative-import-paths'
import preferArrowPlugin from 'eslint-plugin-prefer-arrow'
import reactPlugin from 'eslint-plugin-react'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import unicornPlugin from 'eslint-plugin-unicorn'
import globals from 'globals'

import { customPlugin } from '@/dev-tools/eslint-plugin-custom'
import { fs } from '@/nodejs/fs'
import { globSync } from '@/nodejs/glob'
import { path } from '@/nodejs/path'
import { frameworkRoot, repoRoot } from '@/root'

const off = 0
const warn = 1
const gitignorePath = path.join(repoRoot, '.gitignore')
const gitignore = includeIgnoreFile(gitignorePath)

const tsExts = '{ts,tsx}'
const jsExts = '{js,jsx,cjs,mjs}'
const allExts = `{${[tsExts, jsExts].map(s => s.slice(1, -1)).join(',')}}`

const ignores = ({ dirs, exts = dirs }: { dirs: string; exts?: string }) => [
  // dirs
  `**/${dirs}/**/*.${allExts}`,
  // sub exts
  `**/*.${exts}.${allExts}`,
]

const jsShadowed = globSync(`**/*.${jsExts}`, { relative: true }).filter(p =>
  tsExts.split(',').some(e => fs.existsSync(p.replace(/\.\w+$/, `.${e}`))),
)
const baseIgnores = [
  // match with prettier ignore and tsconfig exclude
  '**/*.min.*',
  ...jsShadowed,
]

const ignoresNonFixable = [
  ...baseIgnores,
  ...ignores({
    dirs: '{codegen,3rd-party}',
  }),
]
const ignoreDefaultExport = [
  ...ignoresNonFixable,
  ...ignores({
    dirs: '{app,.storybook}',
    exts: '{config,stories}',
  }),
]

const base: ConfigWithExtends = {
  files: [`**/*.${allExts}`],
  ignores: baseIgnores,
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
    react: reactPlugin,
    import: importPlugin,
    'simple-import-sort': simpleImportSortPlugin,
    'no-relative-import-paths': noRelativeImportPathsPlugin,
    'prefer-arrow': preferArrowPlugin,
    unicorn: unicornPlugin,
    custom: customPlugin,
  },
  rules: {
    curly: [warn, 'all'],
    quotes: [warn, 'single', { avoidEscape: true }],
    'react/jsx-curly-brace-presence': warn,
    semi: [warn, 'never'],
    'arrow-body-style': [warn, 'as-needed'],
    'no-useless-rename': warn,
    'object-shorthand': [warn, 'always'],
    'one-var': [warn, 'never'],
    'prefer-const': warn,
    'react/jsx-no-useless-fragment': warn,
    'spaced-comment': [warn, 'always', { markers: ['/'] }],

    'import/first': warn,
    'import/newline-after-import': warn,
    'import/no-duplicates': warn,

    'simple-import-sort/imports': [
      warn,
      {
        groups: [
          ['^\\u0000'],
          ['^@?\\w'],
          ['\\.(s?css|svg|png|jpe?g|gif)$'],
          ['^[^.]'],
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': warn,

    'import/consistent-type-specifier-style': [warn, 'prefer-top-level'],
    '@typescript-eslint/consistent-type-imports': warn,
    '@typescript-eslint/no-import-type-side-effects': warn,

    'import/no-useless-path-segments': [
      warn,
      {
        noUselessIndex: true,
      },
    ],
    'import/enforce-node-protocol-usage': [warn, 'always'],
  },
}

const nonFix: ConfigWithExtends = {
  ...base,
  rules: {
    eqeqeq: [warn, 'always'],
    'no-return-assign': warn,
    'no-func-assign': warn,
    'no-class-assign': warn,
    'import/no-mutable-exports': warn,

    '@typescript-eslint/no-unused-vars': [warn, { args: 'none' }],
    '@typescript-eslint/no-shadow': warn,

    'prefer-arrow/prefer-arrow-functions': [
      warn,
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: true,
      },
    ],
    'prefer-arrow-callback': [warn, { allowNamedFunctions: true }],
    'func-style': [warn, 'expression', { allowArrowFunctions: true }],

    'unicorn/filename-case': [
      warn,
      {
        case: 'kebabCase',
      },
    ],

    'no-restricted-imports': [
      warn,
      {
        paths: [
          {
            name: 'react-native',
            importNames: [
              'Text',
              'TextProps',
              'View',
              'ViewProps',
              'ScrollView',
              'ScrollViewProps',
              'Pressable',
              'PressableProps',
              'TextInput',
              'TextInputProps',
              'FlatList',
              'FlatListProps',
              'Image',
              'ImageProps',
              'SafeAreaView',
            ],
            message: 'Use @/components/base instead',
          },
          {
            name: 'react-native',
            importNames: ['useWindowDimensions'],
            message: 'Use @/hooks instead',
          },
        ],
      },
    ],

    'custom/no-access-property': off,
    'custom/no-error-variable': warn,
    'custom/no-import-default': [warn, ['react']],
    'custom/no-import-outside': off,
    'custom/no-json-stringify': warn,
    'custom/no-nullish-coalescing': warn,
    'custom/no-use-state': off,
    'custom/no-void-union': off,
  },
}

const dirsWithAlias = [
  { rootDir: path.relative(repoRoot, frameworkRoot), prefix: '@' },
  ...globSync('**/src', { onlyFiles: false, relative: true }).map(rootDir => ({
    rootDir,
    prefix: '#',
  })),
]
const noRelativeImport: ConfigWithExtends[] = dirsWithAlias.map(d => ({
  ...base,
  files: base.files?.map(f => `${d.rootDir}/${f}`),
  rules: {
    // import - no relative import
    'no-relative-import-paths/no-relative-import-paths': [
      warn,
      { allowSameFolder: false, ...d },
    ],
  },
}))
const noRelativeExport: ConfigWithExtends[] = dirsWithAlias.map(d => ({
  ...base,
  files: base.files?.map(f => `${d.rootDir}/${f}`),
  rules: {
    // export - no relative export
    'custom/no-relative-export-paths': [warn, d],
  },
}))

const noDefaultExport: ConfigWithExtends = {
  ...base,
  ignores: ignoreDefaultExport,
  rules: {
    'import/no-default-export': warn,
  },
}

let tsBase: ConfigWithExtends[] = []
let tsNonFixable: ConfigWithExtends[] = []

// use flag to esable since it is very slow to run with them
if (process.env._ESLINT_TS) {
  const tsconfig = globSync('**/tsconfig.json')
  tsBase = tsconfig.map(p => ({
    ...base,
    languageOptions: {
      ...base.languageOptions,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: p,
      },
    },
    rules: {},
  }))
  tsNonFixable = tsBase.map(b => ({
    ...b,
    ignores: ignoresNonFixable,
    rules: {
      '@typescript-eslint/no-unnecessary-condition': warn,
    },
  }))
}

export const config = defineConfig(
  gitignore,
  base,
  nonFix,
  noRelativeImport,
  noRelativeExport,
  noDefaultExport,
  tsBase,
  tsNonFixable,
)
