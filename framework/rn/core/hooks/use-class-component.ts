/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { useRefConstruct } from '@/rn/core/hooks/use-ref-construct'
import { mergeDefault } from '@/rn/core/utils/merge-default'
import type { Updater } from '@/rn/immer'
import { useImmer } from '@/rn/immer'
import type {
  NoExtra,
  OmitUndefined,
  PartialDefaultProps,
} from '@/shared/ts-utils'

export interface ClassComponent<Props = never, State = never> {
  props: Props
  state: State
  use?: () => void
}

export const closureUseClassComponent = <
  Props,
  State,
  Instance extends ClassComponent<Props, State>,
  DefaultProps extends Partial<Props> = never,
>(
  Constructor: {
    new (props: Props, state: State, setState: Updater<State>): Instance
    defaultProps?: NoExtra<Props, DefaultProps>
  } & (keyof OmitUndefined<State> extends never
    ? { getInitialState?: (props: Props) => OmitUndefined<State> }
    : { getInitialState: (props: Props) => OmitUndefined<State> }),
) => {
  const { defaultProps, getInitialState } = Constructor
  const useClassComponent = (
    props: PartialDefaultProps<Props, keyof DefaultProps>,
  ) => {
    const p = mergeDefault(props, defaultProps) as Props
    const initialState = useRefConstruct(() => getInitialState?.(p) || {})
    const [s, setState] = useImmer(initialState as State)
    const v = useRefConstruct(() => new Constructor(p, s, setState))
    v.props = p
    v.state = s
    v.use?.()
    return v
  }
  return useClassComponent
}
