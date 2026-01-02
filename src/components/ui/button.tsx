import type { PropsWithChildren, ReactNode } from 'react'

import type { PressableProps } from '@/components/base/pressable'
import { Pressable } from '@/components/base/pressable'
import { Text } from '@/components/base/text'
import { View } from '@/components/base/view'
import type { Variant } from '@/tw/cva'
import { cva } from '@/tw/cva'

const button = cva({
  classNames: {
    button:
      'group flex cursor-pointer items-center justify-center gap-2 overflow-hidden transition select-none active:translate-y-0.5',
    text: 'font-medium select-none',
    press: 'absolute inset-px translate-y-1 bg-gray-500',
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
        press: 'rounded-none',
      },
      rounded: {
        button: 'rounded-md',
        press: 'rounded-md',
      },
      pill: {
        button: 'rounded-full',
        press: 'rounded-full',
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
    ripples?: ReactNode
  }>

export const Button = ({
  type,
  appearance,
  size,
  shape,
  className,
  children,
  ripples,
  ...props
}: ButtonProps) => {
  const cn = button({
    type,
    appearance,
    size,
    shape,
  })

  return (
    <View>
      <View className={cn.press} />
      <Pressable
        {...props}
        className={[cn.button, className]}
        // @ts-ignore
        dataSet={{ button: 1 }}
      >
        {ripples}
        <Text className={cn.text}>{children}</Text>
      </Pressable>
    </View>
  )
}
