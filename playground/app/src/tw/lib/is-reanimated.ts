/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

type Style = {
  transitionProperty?: unknown
  animationName?: unknown
}

// style should be flatten already in create class name component
export const isReanimated = (props: any) => {
  const style: Style | undefined = props.style
  if (!style) {
    return false
  }
  return style.transitionProperty || style.animationName
}
