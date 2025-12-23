import type { ClassNameSingle } from '@/tw/class-name'

type FnTaggedTemplateLiteral = (
  strings: TemplateStringsArray,
  ...values: (string | number)[]
) => ClassNameSingle

// only for typing
// should be transpiled and never get called
export const tw = undefined as any as FnTaggedTemplateLiteral
