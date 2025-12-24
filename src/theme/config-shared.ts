import type { ColorSchemeName } from 'react-native'

export const darkModeCookieKey = 'dark-mode'
export const darkModeCookieMaxAge = 60 * 60 * 24 * 365
export const darkModeEnabled = '1'
export const darkModeDisabled = '0'

export const darkModeToBolean = (v?: string | null) => {
  if (v === darkModeEnabled || v === darkModeDisabled) {
    return v === darkModeEnabled
  }
  return
}

export type DarkMode = {
  dark: boolean
  system: boolean
}
export const darkModeCompose = (
  user: boolean | undefined,
  os: ColorSchemeName | null | undefined,
): DarkMode => ({
  dark: user !== undefined ? user : os === 'dark',
  system: user === undefined,
})
