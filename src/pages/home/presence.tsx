'use client'

import { useState } from 'react'

import { Presence } from '@/components/base/presence'
import { Text } from '@/components/base/text'
import { FadeIn, FadeOut } from '@/presence'

export const DemoPresence = () => {
  const [show, setShow] = useState(true)
  return (
    <>
      <Text
        className='mt-5 text-center text-black transition dark:text-gray-200'
        onPress={() => {
          setShow(!show)
        }}
      >
        Animate Presence
      </Text>
      <Presence
        show={show}
        className='m-auto mt-2 h-20 w-20 rounded-md bg-red-500'
        entering={FadeIn}
        exiting={FadeOut}
      />
    </>
  )
}
