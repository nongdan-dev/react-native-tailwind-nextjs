// react-native entry point

import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import type { ViewStyle } from 'react-native'
import { AppRegistry } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { i18nPromise, I18nProvider } from '@/i18n/index.native'
import { rHome } from '@/pages/route-paths'
import { routes } from '@/pages/routes'
import { darkModePromise, DarkModeProvider } from '@/theme/client.native'
import { MarkerPeerProvider } from '@/tw/marker.native'
import { tw } from '@/tw/tw'
import { composeProviders } from '@/utils/compose-providers'

import { name as appName } from '../app.json'

const RootStack = createNativeStackNavigator({
  screens: routes,
  initialRouteName: rHome,
  screenOptions: {
    headerShown: false,
    contentStyle: tw`bg-white` as ViewStyle,
  },
})
const Navigation = createStaticNavigation(RootStack)

const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Promise.all([i18nPromise, darkModePromise]).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    // TODO: add global loading such as splash screen
    return null
  }

  return children
}

export const App = composeProviders(
  LoadingProvider,
  MarkerPeerProvider,
  I18nProvider,
  DarkModeProvider,
  SafeAreaProvider,
  Navigation,
)
AppRegistry.registerComponent(appName, () => App)
