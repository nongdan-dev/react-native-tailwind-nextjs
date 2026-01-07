/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { Link } from '@react-navigation/native'
import { omit } from 'lodash'

import type { LinkPropsWocn } from '@/components/base-without-class-name/link-untyped'

const webProps: (keyof LinkPropsWocn)[] = ['prependCurrentLocale', 'scroll']

export const LinkUntypedWocn = ({ pathname, query, ...props }: any) => {
  // omit web props
  props = omit(props, webProps)
  return <Link {...props} screen={pathname} params={query} />
}
