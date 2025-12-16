import type { Platform } from 'react-native'
import { create } from 'twrnc/create'

import { twrnc } from '#/babel-plugin-tw/config'

import packageJson from '../../../package.json'

export const createTwrnc = (platform: Platform['OS']) => {
  const rnVersionStr = packageJson.dependencies['react-native']
  const matches = /(\d+)\.(\d+)\.(\d+)/.exec(rnVersionStr)
  if (!matches) {
    throw new Error('Can not parse react native version')
  }
  const rnVersion = {
    major: Number(matches[1]),
    minor: Number(matches[2]),
    patch: Number(matches[3]),
  }
  // eslint-disable-next-line custom/no-access-property
  return create(twrnc, platform, rnVersion).style
}

export type Twrnc = ReturnType<typeof createTwrnc>
