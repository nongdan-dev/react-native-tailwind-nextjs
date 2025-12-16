import {
  useIsFocused,
  useRoute as useRouteOriginal,
} from '@react-navigation/native'

export const useRoute = () => {
  const r = useRouteOriginal()
  return {
    pathname: r.name,
    query: r.params,
  }
}

export const useIsRouteFocused = () => useIsFocused()
