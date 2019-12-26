import './Input.scss'
import classNames from 'classnames'
import React, { ComponentProps } from 'react'

type Props = ComponentProps<'input'> & { width?: number | string }

const cn = 'input'

export function Input(props: Props) {
    const { style, className, width = props.type === 'checkbox' ? '2em' : '15em', ...restProps } = props
    return (
        <input
            {...restProps}
            className={classNames(cn, className)}
            style={{ ...style, width }}
        />
    )
}
