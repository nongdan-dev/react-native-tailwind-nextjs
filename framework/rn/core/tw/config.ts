/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { TwConfig } from 'twrnc'
import { create } from 'twrnc'

import { twrncConfig } from '@/rn/core/twrnc-config'
import type { StrMap } from '@/shared/ts-utils'

let twMapMinified: StrMap<string> = {}
let minifiedMapTw: StrMap<string> = {}
export const twToMinified = (v: string) => twMapMinified[v]
export const minifiedToTw = (v: string) => minifiedMapTw[v]

export const setMinifiedClassNames = (json: StrMap<string>) => {
  twMapMinified = json
  minifiedMapTw = {}
  for (const [k, v] of Object.entries(json)) {
    minifiedMapTw[v] = k
  }
}

let twrnc = create(twrncConfig)
export const setTwrncConfig = (c: TwConfig) => {
  twrnc = create(c)
}
export const getTwrnc = () => twrnc.style
