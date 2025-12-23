import type { ClassName } from '@/tw/class-name'
import { clsx } from '@/tw/clsx'
import type { StrMap } from '@/utils/ts'

type Common = {
  className?: ClassName
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
    clsx(
      'relative m-0 inline list-none border-0 border-solid border-black bg-transparent p-0 text-start font-sans text-sm wrap-break-word whitespace-pre-wrap text-black no-underline',
      d.hasTextAncestor && 'whitespace-[inherit] font-[inherit] text-inherit',
      d.numberOfLines === 1 &&
        'max-w-full overflow-hidden wrap-normal text-ellipsis whitespace-nowrap',
      // line-clamp-<number> should be supported in text.native.tsx
      d.numberOfLines &&
        d.numberOfLines > 1 &&
        'max-w-full overflow-clip text-ellipsis',
      d.selectable ? 'select-text' : 'select-none',
      d.pressable && 'cursor-pointer',
    ),
  View: (d: View) =>
    clsx(
      'm-h-0 m-w-0 relative z-0 m-0 flex shrink-0 basis-auto list-none flex-col content-start items-stretch border-0 border-solid border-black bg-transparent p-0 no-underline',
      d.inline && 'inline-flex',
    ),
  Pressable: (d: Pressable) =>
    clsx(
      !d.disabled ? 'cursor-pointer touch-manipulation' : 'pointer-events-none',
    ),
  ScrollView: (d: ScrollView) =>
    clsx(
      d.stickyHeader && 'sticky top-0 z-10',
      d.pagingEnabledChild && 'snap-start',
      d.contentContainerCenterContent && 'grow justify-center',
      d.pagingEnabledHorizontal && 'snap-x snap-mandatory',
      d.pagingEnabledVertical && 'snap-y snap-mandatory',
      d.base && 'shrink grow transform-[translateZ(0)]',
      d.baseHorizontal && 'flex-col overflow-x-hidden overflow-y-auto',
      d.baseHorizontal && 'flex-row overflow-x-auto overflow-y-hidden',
    ),
  TextInput: (d: TextInput) =>
    clsx(
      'rounded-0 font-sm m-0 resize-none [appearance:textfield] border-0 border-solid border-black bg-transparent p-0 font-sans outline-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
      // placeholderTextColor should be supported in input.native.tsx
      d.caretHidden && 'caret-transparent',
    ),
  FlatList: (d: FlatList) => clsx(d.columnWrapper && 'flex-row'),
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
export const rnwClassName = (d: any, o: Common) => {
  const arr = Object.keys(d)
    .sort((a, b) => all[a] - all[b])
    .map(k => map[k](d[k]))
  return clsx(
    arr,
    o.pointerEvents === 'auto' && 'pointer-events-auto',
    o.pointerEvents === 'none' && 'pointer-events-none',
    o.className,
  )
}
