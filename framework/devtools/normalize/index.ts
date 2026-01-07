/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { normalizeLicenseHeader } from '@/devtools/normalize/license-header'
import { normalizePackageJson } from '@/devtools/normalize/package-json'

export const run = () =>
  Promise.all([normalizePackageJson(), normalizeLicenseHeader()])
