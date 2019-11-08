import './Textarea.scss'
import classNames from 'classnames'
import React, { ComponentProps } from 'react'

type Props = ComponentProps<'textarea'> & { width?: number | string }

const cn = 'textarea'

export function Textarea(props: Props) {
    const { className, width, style } = props
    return (
        <textarea
            {...props}
            className={classNames(cn, className)}
            style={{ ...style, width }}
        />
    )
}
