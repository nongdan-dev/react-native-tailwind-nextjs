import type { ConfigAPI, PluginObj } from '@babel/core'
import { get } from 'lodash'
import fs from 'node:fs'
import path from 'node:path'

import { isInSrcRoot, srcRoot } from '#/root'

export const clientExtensionPlugin = (api: ConfigAPI): PluginObj => {
  const isServer = getIsServer({
    api,
    throwOnInvalid: true,
  })

  return {
    visitor: {
      // use program path to get plugin pass and perform some checks before traverse
      // also prioritize this plugin over others such as react compiler
      Program: (programPath, pluginPass) => {
        // must have plugin pass to proceed with the current file name
        if (!pluginPass || !isInSrcRoot(pluginPass.filename)) {
          return
        }
        if (isServer) {
          return
        }
        const currentFilename = pluginPass.filename

        programPath.traverse({
          ImportDeclaration: p => {
            const n = p.node
            if (n.importKind === 'type') {
              return
            }
            const clientVariant = getClientVariant({
              currentFilename,
              importPath: n.source.value,
            })
            if (!clientVariant) {
              return
            }
            n.source.value = clientVariant
          },
        })
      },
    },
  }
}

export const getIsServer = ({
  api,
  throwOnInvalid,
}: {
  api: ConfigAPI
  throwOnInvalid?: boolean
}) => {
  // could be empty in traverse only mode without api plugin pass
  if (typeof api?.caller !== 'function') {
    return
  }
  let isServer: boolean | undefined = undefined
  api.caller(c => {
    if (!c) {
      return undefined
    }
    isServer = get(c, 'isServer')
    return undefined
  })
  if (throwOnInvalid && typeof isServer !== 'boolean') {
    throw new Error('Missing isServer in babel plugin')
  }
  return isServer
}

const aliasImport = /^[@#][/\\]/
const extensions = ['ts', 'tsx']
const indexes = ['', '/index']
const alreadyResolved = ['client', 'server', 'native', 'ios', 'android']

type GetRscVariantOptions = {
  currentFilename: string
  importPath: string
}

export const getClientVariant = ({
  currentFilename,
  importPath,
}: GetRscVariantOptions) => {
  if (!importPath || typeof importPath !== 'string') {
    return
  }
  let baseAbs = ''
  if (aliasImport.test(importPath)) {
    baseAbs = path.join(srcRoot, importPath.replace(aliasImport, ''))
  } else if (importPath.startsWith('.')) {
    baseAbs = path.join(path.dirname(currentFilename), importPath)
  }
  if (!baseAbs) {
    return
  }
  if (alreadyResolved.some(k => importPath.endsWith(`.${k}`))) {
    return
  }
  for (const ext of extensions) {
    for (const idx of indexes) {
      const abs = `${baseAbs}${idx}.client.${ext}`
      if (currentFilename === abs) {
        // allow to import 'something' in something.variant, if we transpile here it will import itself
        // NOTE: in react native, it is transpiled anyway and it will import itself with this case
        return
      }
      if (fs.existsSync(abs)) {
        return `${importPath}${idx}.client`
      }
    }
  }
  return
}
