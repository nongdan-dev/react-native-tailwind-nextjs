import type { Context } from 'react'
import { useContext } from 'react'

export const useSafeContext = <T>(
  Ctx: Context<T | undefined>,
  err?: string,
): T => {
  const v = useContext(Ctx)
  if (v === undefined) {
    throw new Error(err || 'Invalid context call')
  }
  return v
}
