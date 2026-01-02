import type { Updater } from 'use-immer'
import { useImmer } from 'use-immer'

import { useRefConstruct } from '@/hooks/use-ref-construct'
import { mergeDefault } from '@/utils/merge-default'
import type { NoExtra, OmitUndefined, PartialDefaultProps } from '@/utils/ts'

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
