import { get, isEqual } from 'lodash'
import { useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'

import { useResponsiveState } from '@/responsive/index.native'
import { useDarkModeState } from '@/theme/client.native'
import type {
  ClassNameHandlerState,
  ClassNameSelector,
  ClassNameState,
} from '@/tw/class-name'
import {
  MarkerGroupProvider,
  useMarkerGroupState,
  useMarkerPeerSetState,
  useMarkerPeerState,
} from '@/tw/marker.native'
import type { RuntimeStyleOptions } from '@/tw/runtime-style'
import { runtimeStyle } from '@/tw/runtime-style'

export const createClassNameComponent =
  (Component: any, extraClassNameProps?: string[]) =>
  ({ className, style, ...props }: any) => {
    const responsiveState = useResponsiveState()
    const darkModeState = useDarkModeState()
    const markerPeerSetState = useMarkerPeerSetState()
    const [handlerState, setHandlerState] = useImmer<ClassNameHandlerState>({})

    const selfState = {
      checked: props.checked,
      disabled: props.disabled,
      ...handlerState,
    }
    const classNameState = {
      ...responsiveState,
      ...darkModeState,
      ...selfState,
    }

    const markerGroupState = useMarkerGroupState()
    const markerPeerState = useMarkerPeerState()
    const markerState = {
      ...markerGroupState,
      ...markerPeerState,
    }
    for (const [k1, v1] of Object.entries(markerState)) {
      for (const [k2, v2] of Object.entries(v1)) {
        const k = `${k1}-${k2}`
        classNameState[k as ClassNameSelector] = v2
      }
    }

    const metadata: ClassNameState = {}
    const metadataGroup: string[] = []
    const metadataPeer: string[] = []

    const options: RuntimeStyleOptions = {
      classNameState: () => classNameState,
      onSelector: ({ selector, style: selectorStyle }) => {
        if (selector === true) {
          return
        }
        const group = selector.startsWith('group')
        const peer = selector.startsWith('peer')
        if (group || peer) {
          const marker = get(selectorStyle, 'marker', false)
          if (!marker) {
            return
          }
          const arr = group ? metadataGroup : metadataPeer
          arr.push(selector)
          return
        }
        metadata[selector] = true
      },
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
        onSelector: () => {
          // TODO: do not support self selectors
        },
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

    const peerProviderRef = useRef<typeof peerProvider>(null)
    const peerProvider = {
      metadataPeer,
      classNameSelfState: selfState,
    }
    useEffect(() => {
      if (!metadataPeer.length) {
        return
      }
      if (isEqual(peerProvider, peerProviderRef.current)) {
        return
      }
      peerProviderRef.current = peerProvider
      markerPeerSetState(d => {
        for (const k of metadataPeer) {
          d[k] = selfState
        }
      })
    })
    useEffect(
      () => () => {
        const keys = peerProviderRef.current?.metadataPeer
        if (!keys?.length) {
          return
        }
        markerPeerSetState(d => {
          for (const k of metadataPeer) {
            delete d[k]
          }
        })
      },
      [],
    )

    const children = <Component {...props} />
    if (!metadataGroup.length) {
      return children
    }

    const groupProvider: any = {}
    for (const k of metadataGroup) {
      groupProvider[k] = selfState
    }
    return (
      <MarkerGroupProvider state={groupProvider}>
        {children}
      </MarkerGroupProvider>
    )
  }
