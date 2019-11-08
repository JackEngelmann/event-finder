import React, { ComponentProps } from 'react'
import classNames from 'classnames'

type Props = ComponentProps<'i'> & { icon: string }

export function Icon(props: Props) {
    const { icon, ...restProps } = props
    return <i className={classNames(`fas fa-${icon}`)} {...restProps} />
}
