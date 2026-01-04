import Animated from 'react-native-reanimated'

import type { PresencePropsWocn } from '@/components/base-without-class-name/presence'

export const PresenceWocn = ({
  show,
  entering,
  exiting,
  ...props
}: PresencePropsWocn) => {
  if (!show) {
    return null
  }
  return (
    <Animated.View
      {...props}
      entering={entering as any}
      exiting={exiting as any}
    />
  )
}
