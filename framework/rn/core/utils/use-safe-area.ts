/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ClassName } from '@/rn/core/tw/class-name'

// on web we dont need safe area
export const useSafeAreaInsets = (): ClassName => undefined
export const useSafeAreaPadding = (): ClassName => undefined
export const useSafeAreaPaddingTop = (): ClassName => undefined
export const useSafeAreaPaddingRight = (): ClassName => undefined
export const useSafeAreaPaddingBottom = (): ClassName => undefined
export const useSafeAreaPaddingLeft = (): ClassName => undefined
