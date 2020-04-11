import * as R from 'ramda'
import React, { ReactNode, useMemo, ComponentProps, CSSProperties } from 'react'

const spaces = [undefined, '0.25em', '0.5em', '1em', '2em']
const attributes = [
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
] as const

type Props = {
  children?: ReactNode
  margin?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  padding?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
} & ComponentProps<'div'>

export function Spacer(props: Props) {
  const memoValues = attributes.map((a) => props[a])
  const {
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  } = props
  const style = useMemo(() => {
    const style: CSSProperties = {}
    for (let attribute of attributes) {
      if (props[attribute]) {
        style[attribute] = spaces[props[attribute]!]
      }
    }
    return style
  }, [
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  ])
  return (
    <div style={style} {...R.omit(attributes, props)}>
      {props.children}
    </div>
  )
}
