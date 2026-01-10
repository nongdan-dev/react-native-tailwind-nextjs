/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */
import type { NativeMethods, PressableProps, ViewComponent } from 'react-native'
import { Pressable } from 'react-native'

import type { CommonProps } from '@/rn/core/components/base-without-class-name/props'

export type PressablePropsWocn = CommonProps<PressableRn> & PressableProps
export const PressableWocn = Pressable

// export original type for ref
export type PressableRn = ViewComponent & NativeMethods
