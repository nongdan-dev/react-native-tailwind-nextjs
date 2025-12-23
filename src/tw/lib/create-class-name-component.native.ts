import { createElement } from 'react'
import { useImmer } from 'use-immer'

import { responsiveBreakpoints, useResponsive } from '@/responsive/index.native'
import { useDarkMode } from '@/theme/client.native'
import type {
  ClassNameSelector,
  SelectorGlobalState,
  SelectorHandlerState,
  SelectorState,
} from '@/tw/class-name'
import type { RuntimeStyleOptions } from '@/tw/runtime-style'
import { runtimeStyle } from '@/tw/runtime-style'

export const createClassNameComponent =
  (Component: any, extraClassNameProps?: string[]) =>
  ({ className, style, ...props }: any) => {
    const globalState: SelectorGlobalState = {}

    const size = useResponsive()
    for (const k of responsiveBreakpoints) {
      globalState[`${k}`] = k === size
    }

    const dark = useDarkMode()
    globalState.dark = dark?.dark
    globalState.light = !globalState.dark

    const [handlerState, setHandlerState] = useImmer<SelectorHandlerState>({})

    const selectorState = {
      ...props,
      ...globalState,
      ...handlerState,
    }

    const metadata: SelectorState = {}
    const onSelector = (selector: ClassNameSelector) => {
      metadata[selector] = true
    }
    const options: RuntimeStyleOptions = {
      selectorState: () => selectorState,
      onSelector,
      warnOnString: true,
    }

    props.style = [runtimeStyle(className, options), style]
    extraClassNameProps?.forEach(k => {
      if (process.env.NODE_ENV !== 'production') {
        if (!k.endsWith('ClassName')) {
          console.error(
            `extra class name prop should end with ClassName, found ${k}`,
          )
        }
      }
      const sk = k.replace(/ClassName$/, 'Style')
      props[sk] = [runtimeStyle(props[k], options), props[sk]]
    })

    if (metadata.active) {
      props.onPressIn = () =>
        setHandlerState(d => {
          d.active = true
        })
      props.onPressOut = () =>
        setHandlerState(d => {
          d.active = false
        })
    }
    if (metadata.focus) {
      props.onFocus = () =>
        setHandlerState(d => {
          d.focus = true
        })
      props.onBlur = () =>
        setHandlerState(d => {
          d.focus = false
        })
    }

    return createElement(Component, props)
  }
