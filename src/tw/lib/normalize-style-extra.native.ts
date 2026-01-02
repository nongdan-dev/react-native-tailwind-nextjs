import { bounce, ping, pulse, spin } from 'react-native-css-animations'
import type {
  CSSAnimationProperties,
  CSSTransitionTimingFunction,
} from 'react-native-reanimated'

import type { StrMap } from '@/utils/ts'

export const transitionTimingFunctionMap: StrMap<CSSTransitionTimingFunction> =
  {
    // custom transtion timing function here
  }
export const animationMap: StrMap<CSSAnimationProperties> = {
  spin,
  ping,
  pulse,
  bounce,
  // custom animation here
}
