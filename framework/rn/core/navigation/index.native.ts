/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import {
  useIsFocused,
  useRoute as useRouteOriginal,
} from '@react-navigation/native'

export const useRoute = () => {
  const r = useRouteOriginal()
  return {
    pathname: r.name,
    query: r.params,
  }
}

export const useIsRouteFocused = () => useIsFocused()
