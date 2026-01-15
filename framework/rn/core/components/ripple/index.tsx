/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ReactNode } from 'react'

import type { PressableProps } from '@/rn/core/components/base/pressable'
import type { RippleProps } from '@/rn/core/components/ripple/config'
import { Ripple } from '@/rn/core/components/ripple/ripple'
import type { Nullish } from '@/shared/ts-utils'

export const useRipple = (
  props: RippleProps | Nullish,
): [ReactNode, PressableProps | undefined] => [<Ripple {...props} />, undefined]
