/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import type { NativeMethods, ViewComponent, ViewProps } from 'react-native'
import { View } from 'react-native'

import type { CommonProps } from '@/rn/core/components/base-without-class-name/props'

export type ViewPropsWocn = CommonProps<ViewRn> & ViewProps
export const ViewWocn = View

// export original type for ref
export type ViewRn = ViewComponent & NativeMethods
