import classNames from 'classnames'
import React from 'react'
import { ComponentProps } from 'react'
import './Select.scss'

type Props = ComponentProps<'select'> & { width?: number | string }

const cn = 'select'

export function Select(props: Props) {
    const { className, width = '15em', style } = props
    return (
        <select
            {...props}
            className={classNames(cn, className)}
            style={{ ...style, width }}
        />
    )
}
