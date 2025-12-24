/* eslint-disable no-restricted-imports */

import { get } from 'lodash'
import { Children, useState } from 'react'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'

import type { ViewPropsWocn } from '@/components/base-without-class-name/view'
import type { GridStyle } from '@/tw/class-name'
import { isReanimated } from '@/tw/lib/is-reanimated'

export const ViewWocn = (props: ViewPropsWocn) => {
  const Component = isReanimated(props) ? Animated.View : View
  const style = props.style as GridStyle | undefined
  if (!style) {
    return <Component {...props} />
  }
  const { grid, gridCols, gap, ...styleWithoutGrid } = style
  props = {
    ...props,
    style: styleWithoutGrid,
  }
  if (!grid) {
    return <Component {...props} />
  }
  const gridStyle = {
    grid,
    gridCols,
    gap,
  }
  return <Grid props={props} grid={gridStyle} />
}

type GridProps = {
  props: any
  grid: GridStyle
}
const Grid = ({ props, grid: { gridCols, gap } }: GridProps) => {
  const { style, children, onLayout, ...rest } = props

  const cols = gridCols && gridCols > 0 ? Math.floor(gridCols) : 0
  const g = typeof gap === 'number' ? gap : 0

  const [w, setW] = useState(0)
  const handleLayout = (e: LayoutChangeEvent) => {
    onLayout?.(e)
    const nextW = e.nativeEvent.layout.width
    if (Math.abs(nextW - w) < 1) {
      // float jitter
      return
    }
    setW(nextW)
  }

  const padding = px(style.padding)
  const pl = px(style.paddingLeft) || padding
  const pr = px(style.paddingRight) || padding
  const pt = px(style.paddingTop) || padding
  const pb = px(style.paddingBottom) || padding

  const innerW = Math.max(0, w - pl - pr)
  const hasMeasured = innerW > 0

  const totalGap = g * Math.max(0, cols - 1)
  const raw = Math.max(0, innerW - totalGap)

  const baseItemW = cols > 0 ? Math.floor(raw / cols) : 0
  const remainder = cols > 0 ? raw - baseItemW * cols : 0

  const containerStyle: ViewStyle = {
    ...style,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: pl,
    paddingRight: pr,
    paddingTop: pt,
    paddingBottom: pb,
  }

  const arr = Children.toArray(children).filter(
    c => c !== null && c !== undefined && typeof c !== 'boolean',
  )
  const wrapped = arr.map((child, i) => {
    const col = i % cols
    const extra = col < remainder ? 1 : 0
    const itemW = baseItemW + extra
    const isLastCol = col === cols - 1
    const childStyle: ViewStyle = {
      width: hasMeasured ? itemW : 0,
      marginRight: isLastCol ? 0 : g,
      marginBottom: g,
    }
    return (
      <ViewWocn key={get(child, 'key', i)} style={childStyle}>
        {child}
      </ViewWocn>
    )
  })

  return (
    <ViewWocn {...rest} style={containerStyle} onLayout={handleLayout}>
      {wrapped}
    </ViewWocn>
  )
}

const px = (v: unknown) => (typeof v === 'number' ? v : 0)
