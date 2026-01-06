/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { normalizeLicense } from './license'
import { normalizePackageJson } from './package-json'

export const run = () =>
  Promise.all([normalizePackageJson(), normalizeLicense()])
