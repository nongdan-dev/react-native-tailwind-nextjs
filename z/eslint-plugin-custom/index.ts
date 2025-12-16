import { noAccessProperty } from '#/eslint-plugin-custom/no-access-property'
import { noErrorVariable } from '#/eslint-plugin-custom/no-error-variable'
import { noImportDefault } from '#/eslint-plugin-custom/no-import-default'
import { noImportOutside } from '#/eslint-plugin-custom/no-import-outside'
import { noJsonStringify } from '#/eslint-plugin-custom/no-json-stringify'
import { noNullishCoalescing } from '#/eslint-plugin-custom/no-nullish-coalescing'

export const customPlugin = {
  meta: {
    name: 'custom',
  },
  rules: {
    'no-access-property': noAccessProperty,
    'no-error-variable': noErrorVariable,
    'no-import-default': noImportDefault,
    'no-import-outside': noImportOutside,
    'no-json-stringify': noJsonStringify,
    'no-nullish-coalescing': noNullishCoalescing,
  },
}
