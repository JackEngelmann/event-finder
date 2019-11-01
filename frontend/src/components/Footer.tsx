import React from 'react'
import './Footer.scss'

type Props = {
    children: React.ReactNode
}

export function Footer(props: Props) {
    return <footer className="footer">
        <div className="footer__content">
            {props.children}
        </div>
    </footer>
}