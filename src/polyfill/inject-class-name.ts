import type { VirtualizedListProps } from 'react-native'

import { tw } from '@/tw'
import type { CnValue } from '@/tw/cn'
import { cn } from '@/tw/cn'
import { cnKey } from '@/utils/platform'
import type { StrMap } from '@/utils/ts'

declare module 'react-native' {
  interface TextProps {
    className?: CnValue
  }
  interface ViewProps {
    className?: CnValue
  }
  interface PressableProps {
    className?: CnValue
  }
  interface ScrollViewProps {
    className?: CnValue
    contentContainerClassName?: CnValue
  }
  interface TextInputProps {
    className?: CnValue
  }
  interface FlatListProps<ItemT> extends VirtualizedListProps<ItemT> {
    className?: CnValue
    columnWrapperClassName?: CnValue
  }

  interface ImageProps {
    className?: CnValue
  }
  interface SvgProps {
    className?: CnValue
  }
}

// inject default css for patched react-native-web

type Common = {
  className?: CnValue
  style?: any
  pointerEvents?: 'auto' | 'box-none' | 'box-only' | 'none'
  writingDirection?: 'ltr' | 'rtl'
}
type Text = Common &
  Partial<{
    hasTextAncestor: boolean
    numberOfLines: number
    selectable: boolean
    pressable: boolean
  }>
type View = Common &
  Partial<{
    inline: boolean
  }>
type Pressable = Common &
  Partial<{
    disabled: boolean
  }>
type ScrollView = Common &
  Partial<{
    stickyHeader: boolean
    pagingEnabledChild: boolean
    contentContainerCenterContent: boolean
    pagingEnabledHorizontal: boolean
    pagingEnabledVertical: boolean
    base: boolean
    baseHorizontal: boolean
    baseVertical: boolean
  }>
type TextInput = Common &
  Partial<{
    placeholderTextColor: string
    caretHidden: boolean
  }>
type FlatList = Common &
  Partial<{
    columnWrapper: boolean
  }>

const map: StrMap<Function> = {
  Text: (d: Text) =>
    cn(
      tw`relative m-0 inline list-none border-0 border-solid border-black bg-transparent p-0 text-start font-sans text-sm wrap-break-word whitespace-pre-wrap text-black no-underline`,
      d.hasTextAncestor && tw`whitespace-[inherit] font-[inherit] text-inherit`,
      d.numberOfLines === 1 &&
        tw`max-w-full overflow-hidden wrap-normal text-ellipsis whitespace-nowrap`,
      // line-clamp-<number> should be supported in text.native.tsx
      d.numberOfLines &&
        d.numberOfLines > 1 &&
        tw`max-w-full overflow-clip text-ellipsis`,
      d.selectable ? tw`select-text` : tw`select-none`,
      d.pressable && tw`cursor-pointer`,
    ),
  View: (d: View) =>
    cn(
      tw`m-h-0 m-w-0 relative z-0 m-0 flex shrink-0 basis-auto list-none flex-col content-start items-stretch border-0 border-solid border-black bg-transparent p-0 no-underline`,
      d.inline && tw`inline-flex`,
    ),
  Pressable: (d: Pressable) =>
    cn(
      !d.disabled
        ? tw`cursor-pointer touch-manipulation`
        : tw`pointer-events-none`,
    ),
  ScrollView: (d: ScrollView) =>
    cn(
      d.stickyHeader && tw`sticky top-0 z-10`,
      d.pagingEnabledChild && tw`snap-start`,
      d.contentContainerCenterContent && tw`grow justify-center`,
      d.pagingEnabledHorizontal && tw`snap-x snap-mandatory`,
      d.pagingEnabledVertical && tw`snap-y snap-mandatory`,
      d.base && tw`shrink grow transform-[translateZ(0)]`,
      d.baseHorizontal && tw`flex-col overflow-x-hidden overflow-y-auto`,
      d.baseHorizontal && tw`flex-row overflow-x-auto overflow-y-hidden`,
    ),
  TextInput: (d: TextInput) =>
    cn(
      tw`rounded-0 font-sm m-0 resize-none [appearance:textfield] border-0 border-solid border-black bg-transparent p-0 font-sans outline-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`,
      // placeholderTextColor should be supported in input.native.tsx
      d.caretHidden && tw`caret-transparent`,
    ),
  FlatList: (d: FlatList) => cn(d.columnWrapper && tw`flex-row`),
}

// sort to preserve order
const all: StrMap<number> = {
  Text: 0,
  View: 0,
  Pressable: 1,
  ScrollView: 2,
  TextInput: 0,
  FlatList: 3,
}
export const injectClassName = (d: any, o: Common) =>
  cn(
    ...Object.keys(d)
      .sort((a, b) => all[a] - all[b])
      .map(k => map[k](d[k])),
    o.pointerEvents === 'auto' && tw`pointer-events-auto`,
    o.pointerEvents === 'none' && tw`pointer-events-none`,
    o[cnKey],
  )
