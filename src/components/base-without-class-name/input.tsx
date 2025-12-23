/* eslint-disable no-restricted-imports */

import type { TextInputProps } from 'react-native'

// placeholder text color should be supported using class name in native
export type InputPropsWocn = Omit<TextInputProps, 'placeholderTextColor'>
export { TextInput as InputWocn } from 'react-native'
