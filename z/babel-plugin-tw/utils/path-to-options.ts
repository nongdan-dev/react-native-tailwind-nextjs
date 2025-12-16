import type { Node, NodePath } from '@babel/core'
import { types as t } from '@babel/core'

import { twCvaFn, useTwFn } from '#/babel-plugin-tw/config'
import type {
  ArrWp,
  Literal,
  MapWp,
  WithPath,
} from '#/babel-plugin-tw/utils/path-to-js'
import {
  pathToArray,
  pathToLiteral,
  pathToNode,
  pathToObject,
  pathToObjectLiteral,
  pathToObjectString,
  pathToString,
} from '#/babel-plugin-tw/utils/path-to-js'
import type { Ctx } from '#/babel-plugin-tw/visitor'

export type ClassNames = MapWp<string>
export type AttrClassNameMap = {
  className: WithPath<string>
  children: WithPath<ClassNames>
}
export type AttrClassName = WithPath<string> | AttrClassNameMap
export type Attr = MapWp<AttrClassName>
export type Attrs = MapWp<Attr>
export type Variant = MapWp<Literal>
export type CompoundVariant = Variant & {
  className: WithPath<string>
  children?: WithPath<ClassNames>
}
export type Options = {
  className: WithPath<string>
  children?: WithPath<ClassNames>
  // only available in useTw
  props?: WithPath<Node>
  childrenProps?: WithPath<Node>
  // only available in twCva
  attributes?: WithPath<Attrs>
  defaultVariant?: WithPath<Variant>
  compoundVariants?: WithPath<ArrWp<CompoundVariant>>
}

export const pathToOptions = (ctx: Ctx, path: NodePath<t.CallExpression>) => {
  const argumentsPath = path.get('arguments')
  if (argumentsPath?.length !== 1) {
    throw ctx.err(path, 'expect exactly one argument')
  }

  const argPath = argumentsPath[0] as NodePath<any>

  const cva = pathToObject<any>(
    ctx,
    argPath,
    undefined,
    (k, kPath, innerPath) => {
      if (k === 'className') {
        return pathToString(ctx, innerPath, kPath)
      }
      if (k === 'children') {
        return pathToObjectString(ctx, innerPath, kPath)
      }
      if (ctx.calleeName === useTwFn && k === 'props') {
        return pathToNode(ctx, innerPath, kPath)
      }
      if (ctx.calleeName === useTwFn && k === 'childrenProps') {
        return pathToNode(ctx, innerPath, kPath)
      }
      if (ctx.calleeName === twCvaFn && k === 'attributes') {
        return pathToObject(ctx, innerPath, kPath, (k2, kPath2, innerPath2) =>
          pathToObject<any>(
            ctx,
            innerPath2,
            kPath2,
            (k3, kPath3, innerPath3) => {
              if (t.isStringLiteral(innerPath3)) {
                return pathToString(ctx, innerPath3, kPath3)
              }
              return pathToObject<any>(
                ctx,
                innerPath3,
                kPath3,
                (k4, kPath4, innerPath4) => {
                  if (k4 === 'className') {
                    return pathToString(ctx, innerPath4, kPath4)
                  }
                  if (k4 === 'children') {
                    return pathToObjectString(ctx, innerPath4, kPath4)
                  }
                  throw ctx.err(kPath4, `unknown key ${k4}`)
                },
              )
            },
          ),
        )
      }
      if (ctx.calleeName === twCvaFn && k === 'defaultVariant') {
        return pathToObjectLiteral(ctx, innerPath, kPath)
      }
      if (ctx.calleeName === twCvaFn && k === 'compoundVariants') {
        return pathToArray(ctx, innerPath, kPath, (i, innerPath2) =>
          pathToObject<any>(
            ctx,
            innerPath2,
            undefined,
            (k3, kPath3, innerPath3) => {
              if (k3 === 'className') {
                return pathToString(ctx, innerPath3, kPath3)
              }
              if (k3 === 'children') {
                return pathToObjectString(ctx, innerPath3, kPath3)
              }
              return pathToLiteral(ctx, innerPath3, kPath3)
            },
          ),
        )
      }
      throw ctx.err(innerPath, `unknown key ${k}`)
    },
  )

  return cva.value as Options
}
