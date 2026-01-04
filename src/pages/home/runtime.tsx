import { Text } from '@/components/base/text'
import { runtimeStyle } from '@/tw/runtime-style'
import { jsonSafe } from '@/utils/json-safe'

export const DemoRuntime = () => {
  const cn = 'text-red-500'
  return (
    <Text className='mt-5 text-center text-black transition dark:text-gray-200'>
      Runtime Style '{cn}' = {jsonSafe(runtimeStyle(cn))}
    </Text>
  )
}
