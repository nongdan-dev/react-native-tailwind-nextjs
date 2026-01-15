/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// tsconfig-paths and json5 were installed at the repo root

declare module 'tsconfig-paths/register' {
  const m: never
  export = m
}
declare module 'json5/lib/register' {
  const m: never
  export = m
}
