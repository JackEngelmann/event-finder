import './Header.scss'
import React, { ReactNode } from 'react'
import { Icon } from './Icon'

type Props = {
    children?: ReactNode
    toggleMobileMenu: () => void
}

const cn = 'header'

export function Header(props: Props) {
    const { children, toggleMobileMenu } = props
    return (
        <div className={cn}>
            <div className={`${cn}__content`}>
                {children}
                <Icon
                    icon="bars"
                    className={`${cn}__menu-icon`}
                    onClick={toggleMobileMenu}
                />
            </div>
        </div>
    )
}
