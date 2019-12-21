import './H1Title.scss'
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode
    hideDivider?: boolean
}

const cn = 'h1-title';

export function H1Title(props: Props) {
    const { children, hideDivider } = props;
    return (
        <div className={cn}>
            <h1>{children}</h1>
            {!hideDivider && (
                <div className={`${cn}__divider`} />
            )}
        </div>
    )
}