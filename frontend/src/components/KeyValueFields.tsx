import './KeyValueFields.scss'
import React from 'react'
import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

const cn = 'key-value-fields'

export function KeyValueFields(props: Props) {
    const { children, ...divProps } = props
    return (
        <div className={cn} {...divProps}>
            {children}
        </div>
    )
}