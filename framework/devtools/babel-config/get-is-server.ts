/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ConfigAPI } from '@babel/core'

import { get } from '@/shared/lodash'

type GetIsServerOptions = {
  api: ConfigAPI
  throwOnInvalid?: boolean
}

export const getIsServer = ({ api, throwOnInvalid }: GetIsServerOptions) => {
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
