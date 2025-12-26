import type { ClassName } from '@/tw/class-name'
import { twMerge } from '@/tw/lib/class-name-minified'

// on web it will return string, on native it is just a placeholder to transpile without any additional logic
export const clsx = (...classNames: ClassName[]): ClassName => {
  const strings = classNames.flat(Infinity as 0).filter(c => c) as string[]
  if (process.env.NODE_ENV !== 'production') {
    strings.forEach(c => {
      if (typeof c !== 'string') {
        console.error('expect className to be a string in web, found:')
        console.error(c)
      }
    })
  }
  return twMerge(strings.join(' '))
}
