import './Page.scss'
import React, { ComponentProps } from 'react';

type Props = ComponentProps<'div'>

const cn = 'page'

export function Page(props: Props) {
    const { children, ...divProps } = props
    return (
        <div className={cn} {...divProps}>
            {children}
        </div>
    )
}