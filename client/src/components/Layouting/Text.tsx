import React, { ComponentProps } from 'react'

const textSizes = [undefined, '1em', '1.6em']
type Props = {
  size?: number
} & ComponentProps<'div'>
export function Text(props: Props) {
  const { size = 0, ...restProps } = props
  return (
    <div
      {...restProps}
      style={{
        fontSize: textSizes[size],
      }}
    >
      {restProps.children}
    </div>
  )
}
