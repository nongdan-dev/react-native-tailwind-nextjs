/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import type { ViewProps } from '@/components/base/view'
import { View } from '@/components/base/view'
import { useSafeAreaPadding } from '@/hooks/use-safe-area-padding'

export const SafeAreaView = (props: ViewProps) => {
  const padding = useSafeAreaPadding()
  return <View {...props} className={[padding, props.className]} />
}
