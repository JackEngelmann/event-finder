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
  inline?: boolean
} & ComponentProps<'div'>

export function Spacer(props: Props) {
  const { inline, ...restProps } = props
  const style = useMemo(() => {
    const style: CSSProperties = {}
    for (let attribute of attributes) {
      if (props[attribute]) {
        style[attribute] = spaces[props[attribute]!]
      }
    }
    return style
  }, [props])
  const Component = props.inline ? 'span' : 'div'
  return (
    <Component style={style} {...R.omit(attributes, restProps)}>
      {props.children}
    </Component>
  )
}
