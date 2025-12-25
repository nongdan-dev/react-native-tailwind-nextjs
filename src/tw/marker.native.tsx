import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { Updater } from 'use-immer'
import { useImmer } from 'use-immer'

import { useSafeContext } from '@/hooks/use-safe-context'
import type {
  ClassNameHandlerState,
  ClassNamePropsState,
} from '@/tw/class-name'
import type { StrMap } from '@/utils/ts'

type State = ClassNameHandlerState & ClassNamePropsState
type MapState = StrMap<State>

type GroupContextValue = MapState
const GroupContext = createContext<GroupContextValue | null>(null)
type GroupProviderProps = PropsWithChildren<{
  state: GroupContextValue
}>

export const MarkerGroupProvider = ({
  state,
  children,
}: GroupProviderProps) => {
  const v = useContext(GroupContext)
  return <GroupContext value={{ ...v, ...state }}>{children}</GroupContext>
}
export const useMarkerGroupState = () => useContext(GroupContext)

type PeerContextValue = {
  state: MapState
  setState: Updater<MapState>
}
const PeerContext = createContext<PeerContextValue | null>(null)
type PeerProviderProps = PropsWithChildren

export const MarkerPeerProvider = ({ children }: PeerProviderProps) => {
  const v = useContext(PeerContext)
  const [state, setState] = useImmer<MapState>({})
  return (
    <PeerContext
      value={{
        state: {
          ...v?.state,
          ...state,
        },
        setState,
      }}
    >
      {children}
    </PeerContext>
  )
}
export const useMarkerPeerSetState = () => useSafeContext(PeerContext).setState
export const useMarkerPeerState = () => useSafeContext(PeerContext).state
