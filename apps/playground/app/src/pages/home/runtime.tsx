/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { runtimeStyle } from '@/rn/tw/runtime-style'
import { jsonSafe } from '@/shared/json-safe'
import { Text } from '#/components/base/text'

export const DemoRuntime = () => {
  const cn = 'text-red-500'
  return (
    <Text className='mt-5 text-center text-black transition dark:text-gray-200'>
      Runtime Style '{cn}' = {jsonSafe(runtimeStyle(cn))}
    </Text>
  )
}
