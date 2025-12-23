/* eslint-disable no-restricted-imports */

import type { TextProps } from 'react-native'

// number of lines should be supported using class name in native
export type TextPropsWocn = Omit<TextProps, 'numberOfLines'>
export { Text as TextWocn } from 'react-native'
