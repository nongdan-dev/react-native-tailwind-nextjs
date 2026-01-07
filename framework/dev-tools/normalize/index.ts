/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { normalizeLicense } from '@/dev-tools/normalize/license'
import { normalizePackageJson } from '@/dev-tools/normalize/package-json'

export const run = () =>
  Promise.all([normalizePackageJson(), normalizeLicense()])
