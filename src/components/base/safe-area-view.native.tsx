import type { ViewProps } from '@/components/base/view'
import { View } from '@/components/base/view'
import { useSafeAreaPadding } from '@/hooks/use-safe-area-padding'

export const SafeAreaView = (props: ViewProps) => {
  const padding = useSafeAreaPadding()
  return <View {...props} className={[padding, props.className]} />
}
