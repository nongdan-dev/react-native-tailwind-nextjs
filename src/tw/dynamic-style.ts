/* eslint-disable custom/no-access-property */

import { create } from 'twrnc'

import twConfig from '../../tailwind.config.cjs'

const twrnc = create(twConfig.extra.twrnc).style

export const dynamicStyle = (
  classNames: any[],
  remap?: (k: string) => string,
) => {
  const style = {}
  classNames
    .flat()
    .filter(s => s)
    .map(s => (typeof s === 'string' ? (remap ? remap(s) : s) : s))
    .map(s => (typeof s === 'string' ? twrnc(s) : s))
    .forEach(s => Object.assign(style, s))
  return style
}
