import { tw } from '@/tw/tw'

// use tw`` here to collect and map when class names are minified
// these class names should match with custom variant in global.css
export const darkClassName = tw`dark` as string
export const lightClassName = tw`light` as string

export * from './config-shared'
