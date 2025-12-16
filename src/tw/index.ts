import type { InputProps } from '@/components/base/input'
import type { PressableProps } from '@/components/base/pressable'
import type { CnValue } from '@/tw/cn'
import { cn } from '@/tw/cn'
import { composeCva } from '@/tw/compose-cva'
import { composeProps } from '@/utils/compose-props'
import type { StrMap } from '@/utils/ts'

type Pre = 'pre' // pre transpiled
type Web = 'web' // post transpiled web
type Native = 'native' // post transpiled native

type PreClassName = string
type WebClassName = string
type NativeClassNameSingle = object | Function | undefined
type NativeClassName = NativeClassNameSingle | NativeClassNameSingle[]

type Cn<T> = T extends Pre
  ? PreClassName
  : T extends Web
    ? WebClassName
    : T extends Native
      ? NativeClassName
      : never

type ClassNames<T> = StrMap<Cn<T>>

// a class name for a attribute value can be just string
// or a map with key of children className and other keys
// to support composing style for other elements in the same component
type AttrClassName<T, Ch> =
  | Cn<T>
  | {
      className: Cn<T>
      children: {
        // both children and attributes are inferred types
        // `k in keyof Ch` doesnt work here
        // there will be extra check in the transpile process
        [k in keyof Ch]?: Cn<T>
      }
    }
type Attr<T, Ch> = StrMap<AttrClassName<T, Ch>>
type Attrs<T, Ch> = StrMap<Attr<T, Ch>>

type VariantOptions<T, Ch, A extends Attrs<T, Ch>> = {
  // taken from cva to convert string to boolean if match
  [K in keyof A]?: keyof A[K] extends 'true' | 'false' ? boolean : keyof A[K]
}

type CompoundVariant<T, Ch, A extends Attrs<T, Ch>> = VariantOptions<
  T,
  Ch,
  A
> & {
  className: Cn<T>
  children?: {
    [k in keyof Ch]?: Cn<T>
  }
}

type Options<T, Ch, A extends Attrs<T, Ch>> = {
  className: Cn<T>
  children?: Ch
  attributes?: A
  defaultVariant?: VariantOptions<T, Ch, A>
  compoundVariants?: CompoundVariant<T, Ch, A>[]
}

type TranspiledOptions<T, Ch, A extends Attrs<T, Ch>> = Options<T, Ch, A> & {
  metadata: Metadata
  metadataChildren: {
    [k in keyof Ch]?: MetadataChildren
  }
}

export type Metadata = Partial<{
  group: true
  peer: true
  active: true
  focus: true
  disabled: true
  checked: true
  responsive: true
  dark: true
}>
export type MetadataChildren = Omit<Metadata, 'group' | 'responsive' | 'dark'> &
  Partial<{
    group_active: true
    group_focus: true
    group_disabled: true
    group_checked: true
    peer_active: true
    peer_focus: true
    peer_disabled: true
    peer_checked: true
  }>

type PropSelectors = Partial<{
  disabled: boolean
  checked: boolean
}>
type PropsOptions<Ch> = Partial<{
  props: PropSelectors
  childrenProps: {
    [k in keyof Ch]?: PropSelectors
  }
}>

type ReturnProps = {
  className: CnValue
  // handlers for active: selector
  onPressIn?: PressableProps['onPressIn']
  onPressOut?: PressableProps['onPressOut']
  // handlers for focus: selector
  onFocus?: InputProps['onFocus']
  onBlur?: InputProps['onBlur']
}
type ReturnPropsArr<Ch> = [
  StrMap,
  Ch extends undefined ? never : { [k in keyof Ch]: StrMap },
]

type HookOptions<T, Ch> = PropsOptions<Ch> &
  Pick<Options<T, Ch, never>, 'className' | 'children'>
type Hook = <Ch extends ClassNames<Pre>>(
  options: HookOptions<Pre, Ch>,
) => ReturnPropsArr<Ch>

export type HookNative = <Ch extends ClassNames<Native>>(
  options: HookOptions<Native, Ch>,
) => ReturnPropsArr<Ch>

type CvaHookOptions<T, Ch, A extends Attrs<T, Ch>> = PropsOptions<Ch> & {
  variant: VariantOptions<T, Ch, A>
}
type CvaHook<T, Ch, A extends Attrs<T, Ch>> = (
  options: CvaHookOptions<T, Ch, A>,
) => ReturnPropsArr<Ch>
type Cva = <Ch extends ClassNames<Pre>, A extends Attrs<Pre, Ch>>(
  options: Options<Pre, Ch, A>,
) => CvaHook<Pre, Ch, A>

export type Variant<Fn extends CvaHook<any, any, any>> =
  Parameters<Fn>[0]['variant']

type CvaWeb = <Ch extends ClassNames<Web>, A extends Attrs<Web, Ch>>(
  options: TranspiledOptions<Web, Ch, A>,
) => CvaHook<Web, Ch, A>

export type CvaNative = <
  Ch extends ClassNames<Native>,
  A extends Attrs<Native, Ch>,
>(
  options: TranspiledOptions<Native, Ch, A>,
) => CvaHook<Native, Ch, A>

//
// implementation

const cvaWeb: CvaWeb = o => ho => {
  const { classNames, childrenClassNames } = composeCva<string>(
    ho.variant as any,
    o as any,
  )

  let resProps: ReturnProps = {
    className: cn(classNames as any),
  }
  resProps = composeProps(resProps, ho.props) as ReturnProps

  const resChildrenProps: StrMap<ReturnProps> = {}
  for (const [k, v] of Object.entries(childrenClassNames)) {
    resChildrenProps[k] = {
      className: cn(v as any),
    }
    resChildrenProps[k] = composeProps(
      resChildrenProps[k],
      ho.childrenProps?.[k],
    ) as ReturnProps
  }

  return [resProps, resChildrenProps] as any
}

type FnTaggedTemplateLiteral = (
  strings: TemplateStringsArray,
  ...values: (string | number)[]
) => CnValue

export const twCva = cvaWeb as Cva
export const useTw = ((o: any) => cvaWeb(o)(o)) as Hook
// should be transpiled and never get called
export const tw = undefined as any as FnTaggedTemplateLiteral
