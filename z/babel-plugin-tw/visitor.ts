/* eslint-disable custom/no-access-property */

import type { Node, NodePath, PluginPass, Visitor } from '@babel/core'
import { types as t } from '@babel/core'
import { get } from 'lodash-es'
import type { Platform } from 'react-native'

import { twCvaFn, twFn, useTwFn } from '#/babel-plugin-tw/config'
import type { Style, ToStyleOptions } from '#/babel-plugin-tw/to-style'
import { safeIncludes, toStyle } from '#/babel-plugin-tw/to-style'
import type { Twrnc } from '#/babel-plugin-tw/utils/create-twrnc'
import { createTwrnc } from '#/babel-plugin-tw/utils/create-twrnc'
import { jsToNode } from '#/babel-plugin-tw/utils/js-to-node'
import type { WithPath } from '#/babel-plugin-tw/utils/path-to-js'
import type {
  AttrClassNameMap,
  ClassNames,
} from '#/babel-plugin-tw/utils/path-to-options'
import { pathToOptions } from '#/babel-plugin-tw/utils/path-to-options'
import { reconstructTwFn } from '#/babel-plugin-tw/utils/reconstruct-tw-fn'

export type Ctx = {
  calleeName: string
  programPath: NodePath<t.Program>
  rootPath: NodePath
  platform: Platform['OS']
  twrnc: Twrnc
  metadata: Metadata
  metadataChildren: {
    [k: string]: MetadataChildren
  }
  min?: { [k: string]: string }
  extract?: (classNames: string[]) => void
  err: (path: NodePath, msg: string) => Error
}

type Metadata = Partial<{
  group: true
  peer: true
  active: true
  focus: true
  disabled: true
  checked: true
  responsive: true
  dark: true
}>
type MetadataChildren = Omit<Metadata, 'group' | 'responsive' | 'dark'> &
  Partial<{
    group_active: true
    group_focus: true
    group_disabled: true
    group_checked: true
    peer_active: true
    peer_focus: true
    peer_disabled: true
    peer_checked: true
  }>

type TranspiledOptions = {
  className: string
  children?: any
  // only available in useTw
  props?: Node
  childrenProps?: Node
  // only available in twCva
  attributes?: any
  defaultVariant?: any
  compoundVariants?: any
  // metadata
  metadata: Metadata
  metadataChildren: MetadataChildren
}

export const createVisitor = ({
  min,
  extract,
  err,
}: Partial<Pick<Ctx, 'min' | 'extract' | 'err'>>): Visitor<PluginPass> => {
  const prepareCtx = (
    path: NodePath,
    pluginPass: PluginPass,
    calleeName: string,
  ) => {
    // mock to test other platforms using extract logic
    const mockPlatform = process.env._MOCK_PLATFORM_OS as any
    if (mockPlatform) {
      min = undefined
      extract = undefined
    }

    const platform: Platform['OS'] =
      mockPlatform || get(pluginPass, 'file.opts.caller.platform') || 'web'

    const twrnc = createTwrnc(platform)
    const metadata: Ctx['metadata'] = {}
    const metadataChildren: Ctx['metadataChildren'] = {}

    const ctx: Ctx = {
      calleeName,
      programPath: path.findParent(p => p.isProgram()) as NodePath<t.Program>,
      rootPath: path,
      platform,
      twrnc,
      metadata,
      metadataChildren,
      min,
      extract,
      err: err || ((errPath, msg) => errPath.buildCodeFrameError(msg)),
    }
    if (!ctx.programPath) {
      throw ctx.err(path, 'BUG: can not find program path')
    }

    if ((min || extract) && platform !== 'web') {
      throw ctx.err(path, `BUG: min|extract in ${platform}`)
    }

    return ctx
  }

  return {
    CallExpression: (path, pluginPass) => {
      const callee = path.node.callee
      if (!t.isIdentifier(callee)) {
        return
      }
      const calleeName = callee.name
      if (calleeName !== useTwFn && calleeName !== twCvaFn) {
        return
      }
      const ctx = prepareCtx(path, pluginPass, calleeName)

      const {
        className,
        children,
        // only available in useTw
        props,
        childrenProps,
        // only available in twCva
        attributes,
        defaultVariant,
        compoundVariants,
      } = pathToOptions(ctx, path)

      if (!className) {
        throw ctx.err(path, 'missing className')
      }

      const toStyleClosure = ({
        v,
        ...o
      }: { v: WithPath<string> } & Pick<
        ToStyleOptions,
        'type' | 'isRootClassName' | 'childrenKey'
      >) => {
        const cn = v.value
        if (typeof cn !== 'string') {
          throw ctx.err(v.path, 'expect string literal')
        }
        return toStyle({
          cn,
          ctx,
          path: v.path,
          ...o,
        })
      }
      const toStyleClosureChildren = (obj: ClassNames) => {
        const o: { [k: string]: Style } = {}
        for (const [k, v] of Object.entries(obj)) {
          o[k] = toStyleClosure({
            v,
            type: 'cva-children',
            childrenKey: k,
          })
        }
        return o
      }
      const validateAttrChildren = (c?: ClassNames) => {
        if (!c) {
          return
        }
        for (const [k, v] of Object.entries(c)) {
          if (!children?.value[k]) {
            throw ctx.err(
              v.keyPath || v.path,
              `${k} is missing at the root children`,
            )
          }
        }
      }

      //
      // convert paths to js values

      const jsClassName = toStyleClosure({
        v: className,
        type: 'cva-root',
        isRootClassName: true,
      })

      const jsChildren: { [k: string]: any } = {}
      if (children) {
        for (const [k, v] of Object.entries(children.value)) {
          jsChildren[k] = toStyleClosure({
            v,
            type: 'cva-children',
            childrenKey: k,
          })
        }
      }

      type Attrs = Required<TranspiledOptions>['attributes']
      type Attr = Attrs[number]

      const jsAttributes: Attrs = {}
      if (attributes) {
        for (const [k1, v1] of Object.entries(attributes.value)) {
          const js: Attr = {}
          for (const [k2, v2] of Object.entries(v1.value)) {
            if (typeof v2.value === 'string') {
              js[k2] = toStyleClosure({
                v: v2 as unknown as WithPath<string>,
                type: 'cva-root',
              })
            } else {
              const { className: attrClassName, children: attrChildren } =
                v2.value as AttrClassNameMap
              if (!attrClassName) {
                throw ctx.err(v2.path, 'missing className')
              }
              if (!attrChildren) {
                throw ctx.err(
                  v2.path,
                  'should use string literal instead if there is only className',
                )
              }
              validateAttrChildren(attrChildren.value)
              js[k2] = {
                className: toStyleClosure({
                  v: attrClassName,
                  type: 'cva-root',
                }),
                children: toStyleClosureChildren(attrChildren.value),
              }
            }
          }
          jsAttributes[k1] = js
        }
      }

      type Variant = Required<TranspiledOptions>['defaultVariant']
      const jsDefaultVariant: Variant = {}
      if (defaultVariant) {
        for (const [k, v] of Object.entries(defaultVariant.value)) {
          jsDefaultVariant[k] = v.value
        }
      }

      type CompoundVariant =
        Required<TranspiledOptions>['compoundVariants'][number]
      const jsCompoundVariants: CompoundVariant[] = []
      if (compoundVariants) {
        for (const v1 of compoundVariants.value) {
          const js = {} as CompoundVariant
          for (const [k2, v2] of Object.entries(v1.value)) {
            if (k2 === 'className') {
              js[k2] = toStyleClosure({
                v: v2 as WithPath<string>,
                type: 'cva-root',
              })
            } else if (k2 === 'children') {
              validateAttrChildren(v2.value as ClassNames)
              js[k2] = toStyleClosureChildren(v2.value as ClassNames)
            } else {
              js[k2] = v2.value
            }
          }
          jsCompoundVariants.push(js)
        }
      }

      if (ctx.metadata.group && !safeIncludes(className.value, 'group')) {
        throw ctx.err(
          className.path,
          'found group in children but missing group in root className',
        )
      }

      if (extract) {
        return
      }

      const transpiled: TranspiledOptions = {
        className: jsClassName as any,
        children: omitEmpty(jsChildren),
        // only available in useTw
        props: props?.value,
        childrenProps: childrenProps?.value,
        // only available in twCva
        attributes: omitEmpty(jsAttributes),
        defaultVariant: omitEmpty(jsDefaultVariant),
        compoundVariants: omitEmpty(jsCompoundVariants),
        // metadata
        metadata: ctx.metadata,
        metadataChildren: ctx.metadataChildren,
      }

      const expr = reconstructTwFn(ctx, transpiled)
      path.replaceWith(expr)
    },

    TaggedTemplateExpression: (path, pluginPass) => {
      const tag = path.node.tag
      if (!t.isIdentifier(tag) || tag.name !== twFn) {
        return
      }
      const ctx = prepareCtx(path, pluginPass, 'tw')

      const style = toStyle({
        cn: path.node.quasi.quasis.map(q => q.value.raw).join(' '),
        ctx,
        path,
        type: 'tag',
      })

      if (ctx.extract) {
        return
      }

      const expr = jsToNode(ctx, style)
      path.replaceWith(expr)
    },
  }
}

const omitEmpty = <T extends object | object[]>(v: T) => {
  if (Array.isArray(v)) {
    return v.length > 0 ? v : undefined
  }
  return Object.keys(v).length > 0 ? v : undefined
}
