/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ComponentType, PropsWithChildren } from 'react'

export const composeProviders = (
  ...arr: ComponentType<PropsWithChildren<any>>[]
): ComponentType<PropsWithChildren> =>
  arr.length === 1
    ? arr[0]
    : ({ children }) =>
        arr.reduceRight(
          (accumulatedChildren, Provider) => (
            <Provider>{accumulatedChildren}</Provider>
          ),
          children,
        )
