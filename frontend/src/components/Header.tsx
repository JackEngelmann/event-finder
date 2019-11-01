import './Header.scss'
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const cn = 'header'

export function Header(props: Props) {
    return (
        <div className={cn}>
            <div className={`${cn}__content`}>
                {props.children}
            </div>
        </div>
    )
}