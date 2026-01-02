import { Text } from '@/components/base/text'
import { View } from '@/components/base/view'

export const Grid = () => (
  <>
    <Text className='mt-5 text-center text-black transition dark:text-gray-200'>
      Basic Grid Columns
    </Text>
    <View className='m-auto grid w-full max-w-150 grid-cols-3 gap-2.5 p-2.5'>
      <View className='h-50 rounded-md bg-amber-100 transition dark:bg-amber-900'></View>
      <View className='h-50 rounded-md bg-cyan-100 transition dark:bg-cyan-900'>
        <View className='grid grid-cols-[20px_1fr_20px] gap-2.5 p-2.5'>
          <View className='h-10 rounded-md bg-amber-100 transition dark:bg-amber-900'></View>
          <View className='h-10 rounded-md bg-red-100 transition dark:bg-red-900'></View>
          <View className='h-10 rounded-md bg-amber-100 transition dark:bg-amber-900'></View>
        </View>
      </View>
      <View className='h-50 rounded-md bg-amber-100 transition dark:bg-amber-900'></View>
    </View>
  </>
)
