/* eslint-disable no-restricted-imports */

import { Text as RnText } from 'react-native'
import Animated from 'react-native-reanimated'

import type { TextProps } from '@/components/base/text'
import { cn, cnFromProps } from '@/tw/cn'
import { isReanimated } from '@/utils/is-reanimated'
import type { StrMap } from '@/utils/ts'

export const Text = (props: TextProps) => {
  let style = cn(cnFromProps(props)) as StrMap | undefined

  if (style) {
    // clone to be able to modify
    style = { ...style }
    props = { ...props, style }
    const k = 'numberOfLines'
    if (k in style) {
      props[k as keyof typeof props] = style[k]
      delete style[k]
    }
  }

  const Component = isReanimated(props) ? Animated.Text : RnText
  return <Component {...props} />
}
