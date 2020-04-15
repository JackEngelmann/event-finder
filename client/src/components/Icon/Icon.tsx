import React, { ComponentProps } from 'react'
import classNames from 'classnames'

type Props = ComponentProps<'i'> & { icon: string; iconPrefix?: string }

export function Icon(props: Props) {
  const { icon, className, iconPrefix = 'fas', ...restProps } = props
  return (
    <i
      className={classNames(`${iconPrefix} fa-${icon}`, className)}
      {...restProps}
    />
  )
}
