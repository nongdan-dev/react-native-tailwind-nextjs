/* eslint-disable no-restricted-imports */

import type { TextProps as RnTextProps } from 'react-native'

// number of lines should be supported using class name in native
export type TextProps = Omit<RnTextProps, 'numberOfLines'>
export { Text } from 'react-native'
