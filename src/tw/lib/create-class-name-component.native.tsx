import { useImmer } from 'use-immer'

import { useResponsiveState } from '@/responsive/index.native'
import { useDarkModeState } from '@/theme/client.native'
import type {
  ClassNameHandlerState,
  ClassNameSelector,
  ClassNameState,
} from '@/tw/class-name'
import type { RuntimeStyleOptions } from '@/tw/runtime-style'
import { runtimeStyle } from '@/tw/runtime-style'

export const createClassNameComponent =
  (Component: any, extraClassNameProps?: string[]) =>
  ({ className, style, ...props }: any) => {
    const responsiveState = useResponsiveState()
    const darkModeState = useDarkModeState()

    const [handlerState, setHandlerState] = useImmer<ClassNameHandlerState>({})

    const classNameState = {
      ...props,
      ...responsiveState,
      ...darkModeState,
      ...handlerState,
    }

    const metadata: ClassNameState = {}
    const onSelector = (selector: ClassNameSelector) => {
      metadata[selector] = true
    }
    const options: RuntimeStyleOptions = {
      classNameState: () => classNameState,
      onSelector,
      warnOnString: true,
    }

    props.style = runtimeStyle(className, {
      ...options,
      style,
    })
    extraClassNameProps?.forEach(k => {
      if (process.env.NODE_ENV !== 'production') {
        if (!k.endsWith('ClassName')) {
          console.error(
            `extra class name prop should end with ClassName, found ${k}`,
          )
        }
      }
      const sk = k.replace(/ClassName$/, 'Style')
      props[sk] = runtimeStyle(props[k], {
        ...options,
        style: props[sk],
      })
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

    return <Component {...props} />
  }
