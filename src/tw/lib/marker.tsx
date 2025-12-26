import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { Updater } from 'use-immer'
import { useImmer } from 'use-immer'

import { useSafeContext } from '@/hooks/use-safe-context'
import type { ClassNameMarkerState } from '@/tw/class-name'

type GroupContextValue = ClassNameMarkerState
const GroupContext = createContext<GroupContextValue | undefined>(undefined)
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
  state: ClassNameMarkerState
  setState: Updater<ClassNameMarkerState>
}
const PeerContext = createContext<PeerContextValue | undefined>(undefined)
type PeerProviderProps = PropsWithChildren

export const MarkerPeerProvider = ({ children }: PeerProviderProps) => {
  const v = useContext(PeerContext)
  const [state, setState] = useImmer<ClassNameMarkerState>({})
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
