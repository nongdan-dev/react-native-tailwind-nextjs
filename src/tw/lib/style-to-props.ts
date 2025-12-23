export const styleToProps = (props: any, styleProps: string[]) => {
  let style = props.style
  if (!style || typeof style !== 'object') {
    return props
  }
  if (!styleProps.some(k => k in style)) {
    return props
  }
  // clone to be able to modify
  style = { ...style }
  props = { ...props, style }
  for (const k of styleProps) {
    if (k in style) {
      props[k] = style[k]
      delete style[k]
    }
  }
  return props
}
