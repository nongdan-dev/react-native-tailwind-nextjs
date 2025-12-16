import type { ViewProps } from '@/components/base/view'
import { View } from '@/components/base/view'
import { useSafeAreaPadding } from '@/hooks/use-safe-area-padding'
import { cn, cnFromProps } from '@/tw/cn'

export const SafeAreaView = (props: ViewProps) => {
  const padding = useSafeAreaPadding()
  return <View {...props} className={cn(padding, cnFromProps(props))} />
}
