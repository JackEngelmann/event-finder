import React, { ComponentProps } from 'react'
import classNames from 'classnames'

type Props = ComponentProps<'i'> & { icon: string }

export function Icon(props: Props) {
    const { icon, className, ...restProps } = props
    return <i className={classNames(`fas fa-${icon}`, className)} {...restProps} />
}
