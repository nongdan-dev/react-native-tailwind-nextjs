import type { PropsWithChildren } from 'react'

import type { PressableProps } from '@/components/base/pressable'
import { Pressable } from '@/components/base/pressable'
import { Text } from '@/components/base/text'
import type { Variant } from '@/tw/cva'
import { cva } from '@/tw/cva'

const button = cva({
  classNames: {
    button:
      'group flex cursor-pointer items-center justify-center gap-2 border border-transparent transition select-none',
    text: 'font-medium',
  },
  attributes: {
    type: {
      default: {},
      primary: {},
      danger: {},
    },
    appearance: {
      solid: {},
      outline: {},
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
      },
      rounded: {
        button: 'rounded-md',
      },
      pill: {
        button: 'rounded-full',
      },
    },
  },
  defaultVariant: {
    type: 'default',
    appearance: 'outline',
    size: 'md',
    shape: 'rounded',
  },
  compoundVariants: [
    {
      type: 'default',
      appearance: 'solid',
      classNames: {
        button:
          'border-gray-100 bg-gray-100 active:border-gray-200 active:bg-gray-200',
        text: 'text-gray-800',
      },
    },
    {
      type: 'primary',
      appearance: 'solid',
      classNames: {
        button:
          'border-blue-600 bg-blue-600 active:border-blue-500 active:bg-blue-500',
        text: 'text-white',
      },
    },
    {
      type: 'danger',
      appearance: 'solid',
      classNames: {
        button:
          'border-red-600 bg-red-600 active:border-red-500 active:bg-red-500',
        text: 'text-white',
      },
    },
    {
      type: 'primary',
      appearance: 'outline',
      classNames: {
        button: 'border-blue-500 active:bg-blue-500',
        text: 'text-blue-500 group-active:text-white',
      },
    },
    {
      type: 'danger',
      appearance: 'outline',
      classNames: {
        button: 'border-red-500 active:bg-red-500',
        text: 'text-red-500 group-active:text-white',
      },
    },
  ],
})

type Props = Variant<typeof button> &
  Omit<PressableProps, 'children'> &
  PropsWithChildren

export const Button = ({
  type,
  appearance,
  size,
  shape,
  className,
  children,
  ...props
}: Props) => {
  const cn = button({
    type,
    appearance,
    size,
    shape,
  })

  return (
    <Pressable {...props} className={[cn.button, className]}>
      <Text className={cn.text}>{children}</Text>
    </Pressable>
  )
}
