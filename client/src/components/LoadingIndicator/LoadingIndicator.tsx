import React from 'react';
import './LoadingIndicator.scss'

const cn = 'loading-indicator'

export function LoadingIndicator() {
    return <div className={cn}>
        <div className={`${cn}__ring`}>
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
}