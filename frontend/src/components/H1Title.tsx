import './H1Title.scss'
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const cn = 'h1-title';

export function H1Title(props: Props) {
    return (
        <div className={cn}>
            <h1>{props.children}</h1>
            <div className={`${cn}__divider`} />
        </div>
    )
}