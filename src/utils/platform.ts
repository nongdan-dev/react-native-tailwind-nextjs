import { Platform } from 'react-native'

export const isWeb = Platform.OS === 'web'
export const isAndroid = Platform.OS === 'android'
export const isIos = Platform.OS === 'ios'

// on react native, className prop will be transpiled into style
// on web, it will be kept intact
export const cnKey = isWeb ? 'className' : 'style'
