/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import type { Ref } from 'react'
import type { NativeMethods, ViewComponent, ViewProps } from 'react-native'
import { View } from 'react-native'

export type ViewPropsWocn = ViewProps & {
  ref?: Ref<ViewRn>
  __rnwTag?: string
}
export const ViewWocn = View

// export original type for ref
export type ViewRn = ViewComponent & NativeMethods
