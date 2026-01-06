/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { noAccessProperty } from '@/dev-tools/eslint-plugin-custom/no-access-property'
import { noErrorVariable } from '@/dev-tools/eslint-plugin-custom/no-error-variable'
import { noImportDefault } from '@/dev-tools/eslint-plugin-custom/no-import-default'
import { noImportOutside } from '@/dev-tools/eslint-plugin-custom/no-import-outside'
import { noJsonStringify } from '@/dev-tools/eslint-plugin-custom/no-json-stringify'
import { noNullishCoalescing } from '@/dev-tools/eslint-plugin-custom/no-nullish-coalescing'
import { noRelativeExportPaths } from '@/dev-tools/eslint-plugin-custom/no-relative-export-paths'

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
    'no-relative-export-paths': noRelativeExportPaths,
  },
}
