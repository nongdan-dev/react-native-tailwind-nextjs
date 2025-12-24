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
