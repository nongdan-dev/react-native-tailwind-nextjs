import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import type {
  CSSAnimationProperties,
  CSSTransitionProperties,
} from 'react-native-reanimated'

// redefine to not import relative module so that this file can be imported from the babel plugin
// this can be fixed if we move to pnpm workspace
type Falsish = undefined | void | null | false | 0 | ''

export type ClassNameWebSingle = string | Falsish
export type ClassNameWeb = ClassNameWebSingle | ClassNameWeb[]

export type Style = TextStyle &
  ViewStyle &
  ImageStyle &
  CSSTransitionProperties<any> &
  CSSAnimationProperties<any>

export type ClassNameNativeWithSelector = {
  selector: ClassNameSelector | true
  style: ClassNameNative
}
export type ClassNameNativeSingle =
  | Style
  | ClassNameNativeWithSelector
  | Falsish
export type ClassNameNative = ClassNameNativeSingle | ClassNameNative[]

export type ClassNameSingle = ClassNameWebSingle | ClassNameNativeSingle
export type ClassName = ClassNameSingle | ClassName[]

export type ClassNameGlobalSelector =
  // responsive
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  // dark
  | 'dark'
  | 'light'
export type ClassNameHandlerSelector = 'active' | 'focus'
export type ClassNamePropsSelector = 'disabled' | 'checked'
export type ClassNameSelector =
  | ClassNameGlobalSelector
  | ClassNameHandlerSelector
  | ClassNamePropsSelector

export type SelectorGlobalState = {
  [k in ClassNameGlobalSelector]?: boolean
}
export type SelectorHandlerState = {
  [k in ClassNameHandlerSelector]?: boolean
}
export type SelectorPropsState = {
  [k in ClassNamePropsSelector]?: boolean
}
export type SelectorState = SelectorGlobalState &
  SelectorHandlerState &
  SelectorPropsState
