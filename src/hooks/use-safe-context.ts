import type { Context } from 'react'
import { useContext } from 'react'

export const useSafeContext = <T>(Ctx: Context<T | null>, err?: string): T => {
  const v = useContext(Ctx)
  if (v === null) {
    throw new Error(err || 'Invalid context call')
  }
  return v
}
