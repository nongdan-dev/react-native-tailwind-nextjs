/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { PropsWithChildren } from 'react'

import type { PressableProps } from '@/rn/core/components/base/pressable'
import { Pressable } from '@/rn/core/components/base/pressable'
import { Text } from '@/rn/core/components/base/text'
import { View } from '@/rn/core/components/base/view'
import { useRipple } from '@/rn/core/components/ui/ripple'
import type { Variant } from '@/rn/core/tw/cva'
import { cva } from '@/rn/core/tw/cva'
import { composeHandlers } from '@/rn/core/utils/compose-handlers'

const button = cva({
  classNames: {
    button:
      'group flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden transition',
    text: 'select-none font-medium',
    elevation: 'absolute inset-px translate-y-1 bg-gray-500',
  },
  attributes: {
    type: {
      default: {},
      primary: {},
      danger: {},
    },
    appearance: {
      solid: {},
      outline: {
        button: 'border border-transparent',
      },
      ghost: {},
    },
    size: {
      sm: {
        button: 'h-7 px-2',
        text: 'text-sm',
      },
      md: {
        button: 'h-9 px-4',
        text: 'text-base',
      },
      lg: {
        button: 'h-11 px-6',
        text: 'text-lg',
      },
      icon: {
        button: 'h-9 w-9 p-0',
        text: 'text-base',
      },
    },
    shape: {
      square: {
        button: 'rounded-none',
        elevation: 'rounded-none',
      },
      rounded: {
        button: 'rounded-md',
        elevation: 'rounded-md',
      },
      pill: {
        button: 'rounded-full',
        elevation: 'rounded-full',
      },
    },
    elevation: {
      true: {
        button: 'active:translate-y-0.5',
      },
    },
  },
  defaultVariant: {
    type: 'default',
    appearance: 'solid',
    size: 'md',
    shape: 'rounded',
  },
  compoundVariants: [
    {
      type: 'default',
      appearance: 'solid',
      classNames: {
        button: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-200',
        text: 'text-gray-800',
      },
    },
    {
      type: 'primary',
      appearance: 'solid',
      classNames: {
        button: 'bg-blue-600 hover:bg-blue-500 active:bg-blue-500',
        text: 'text-white',
      },
    },
    {
      type: 'danger',
      appearance: 'solid',
      classNames: {
        button: 'bg-red-600 hover:bg-red-500 active:bg-red-500',
        text: 'text-white',
      },
    },
    {
      type: 'primary',
      appearance: 'outline',
      classNames: {
        button: 'border-blue-500 hover:bg-blue-500 active:bg-blue-500',
        text: 'text-blue-500 group-hover:text-white group-active:text-white',
      },
    },
    {
      type: 'danger',
      appearance: 'outline',
      classNames: {
        button: 'border-red-500 hover:bg-red-500 active:bg-red-500',
        text: 'text-red-500 group-hover:text-white group-active:text-white',
      },
    },
  ],
})

export type ButtonProps = Variant<typeof button> &
  Omit<PressableProps, 'children'> &
  PropsWithChildren<{
    elevation?: boolean
    ripple?: boolean
  }>

export const Button = ({
  type,
  appearance,
  size,
  shape,
  className,
  children,
  elevation = true,
  ripple = true,
  ...props
}: ButtonProps) => {
  const cn = button({
    type,
    appearance,
    size,
    shape,
    elevation,
  })

  const [jsxRipples, propsForRipples] = useRipple()
  if (ripple) {
    props = composeHandlers(props, propsForRipples)
  }

  const pressable = (
    <Pressable {...props} className={[cn.button, className]}>
      {ripple && jsxRipples}
      <Text className={cn.text}>{children}</Text>
    </Pressable>
  )

  if (!elevation) {
    return pressable
  }

  return (
    <View>
      <View className={cn.elevation} />
      {pressable}
    </View>
  )
}
