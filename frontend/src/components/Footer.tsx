import React from 'react'
import './Footer.scss'

type Props = {
    children: React.ReactNode
}

const cn = 'footer'

export function Footer(props: Props) {
    return (
        <footer className={cn}>
            <div className={`${cn}__content`}>{props.children}</div>
        </footer>
    )
}
