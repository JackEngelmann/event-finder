import './FormattedHtml.scss'
import React, { ComponentProps } from 'react';

type Props = ComponentProps<'div'>

const cn = 'formatted-html'

export function FormattedHtml(props: Props) {
    return (
        <div className={cn}>
            {props.children}
        </div>
    )
}