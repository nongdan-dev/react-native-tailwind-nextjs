/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import { ScrollView } from 'react-native'
import Animated from 'react-native-reanimated'

import { isReanimated } from '@/rn/core/components/base-without-class-name/props'
import type { ScrollViewPropsWocn } from '@/rn/core/components/base-without-class-name/scroll-view'

export const ScrollViewWocn = (props: ScrollViewPropsWocn) => {
  const Component: any = isReanimated(props) ? Animated.ScrollView : ScrollView
  return <Component {...props} />
}
