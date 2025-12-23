import { rnwClassName } from '@/tw/lib/react-native-web'

if (typeof global === 'object' && global) {
  // @ts-expect-error
  global.__rnwClassName = rnwClassName
}
