import type { PluginObj } from '@babel/core'
import fs from 'fs-extra'

import { codegenOutput } from '#/babel-plugin-tw/config'
import { createVisitor } from '#/babel-plugin-tw/visitor'

const min = process.env._NEXT
  ? fs.readJsonSync(codegenOutput, 'utf-8')
  : undefined

export const twPlugin = (): PluginObj => ({
  visitor: createVisitor({ min }),
})
