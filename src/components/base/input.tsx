/* eslint-disable no-restricted-imports */

import type { TextInputProps as RnTextInputProps } from 'react-native'

// placeholder text color should be supported using class name in native
export type InputProps = Omit<RnTextInputProps, 'placeholderTextColor'>
export { TextInput as Input } from 'react-native'
