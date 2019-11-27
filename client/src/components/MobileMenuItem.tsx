import React, { ReactNode } from 'react'
import './MobileMenuItem.scss'
import { NavLink } from 'react-router-dom'

type Props = {
    onClick: () => void
    children: ReactNode
    to: string
}
const cn = 'mobile-menu-item'

export function MobileMenuItem(props: Props) {
    const { children, onClick, to } = props
    return (
        <NavLink
            className={cn}
            onClick={onClick}
            to={to}
            activeClassName={`${cn}__active`}
        >
            {children}
        </NavLink>
    )
}
