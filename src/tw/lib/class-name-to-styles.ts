import { Platform } from 'react-native'
import { create } from 'twrnc'

import type {
  ClassName,
  ClassNameNative,
  ClassNameWithSelector,
  Style,
} from '@/tw/class-name'
import { twUnminify } from '@/tw/lib/class-name-minified'
import { classNameToNative } from '@/tw/lib/class-name-to-native'

import twConfig from '../../../tailwind.config.cjs'

const twrnc = create(twConfig.extra.twrnc).style

export type ClassNameToStylesOptions = {
  className: ClassName
  onSelector: (className: ClassNameWithSelector) => ClassNameNative
  warnOnString?: boolean
}

export const classNameToStyles = (options: ClassNameToStylesOptions) => {
  const styles: StyleWithLevel[] = []
  classNameToStylesRecursive({ ...options, level: 0, styles })
  return styles.sort((a, b) => a.level - b.level).map(s => s.style)
}

// deeper level will take precedence
type StyleWithLevel = {
  level: number
  style: Style
}

type ClassNameToStylesRecursiveOptions = ClassNameToStylesOptions & {
  level: number
  styles: StyleWithLevel[]
}

const classNameToStylesRecursive = ({
  ...options
}: ClassNameToStylesRecursiveOptions) => {
  const { className, onSelector, warnOnString, level, styles } = options
  if (!className) {
    return
  }
  if (Array.isArray(className)) {
    className.forEach(v => {
      options.className = v
      classNameToStylesRecursive(options)
    })
    return
  }
  if (typeof className === 'string') {
    if (process.env.NODE_ENV !== 'production' && warnOnString) {
      console.error('expect className to be an object in native, found:')
      console.error(className)
    }
    options.className = classNameToNative({
      platform: Platform.OS,
      twrnc,
      className: twUnminify ? twUnminify(className) : className,
    })
    classNameToStylesRecursive(options)
    return
  }
  if ('selector' in className) {
    options.className = onSelector(className)
    if (!options.className) {
      return
    }
    options.level += 1
    classNameToStylesRecursive(options)
    return
  }
  styles.push({
    level,
    style: className,
  })
}
