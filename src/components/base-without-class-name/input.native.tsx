/* eslint-disable no-restricted-imports */

import { TextInput } from 'react-native'

import type { InputPropsWocn } from '@/components/base-without-class-name/input'
import { createAnimatedComponent } from '@/tw/lib/create-animated-component'
import { isReanimated } from '@/tw/lib/is-reanimated'
import { styleToProps } from '@/tw/lib/style-to-props'

const styleProps = ['placeholderTextColor', 'caretHidden']

export const InputWocn = (props: InputPropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component: any = isReanimated(props) ? AnimatedInput : TextInput
  return <Component {...props} />
}

const AnimatedInput = createAnimatedComponent(TextInput)
