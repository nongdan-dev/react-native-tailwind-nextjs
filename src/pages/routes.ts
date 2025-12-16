import { HomePage } from '@/pages/home'
import { rHome } from '@/pages/route-paths'

export const routes = {
  [rHome]: HomePage,
}
export type Routes = typeof routes
export type RoutesK = keyof Routes

export type RoutesData = {
  [rHome]: never
}
