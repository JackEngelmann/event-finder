import './Header.scss'
import React, { ReactNode } from 'react'
import { Icon } from './Icon'

type Props = {
    children?: ReactNode
    toggleMobileMenu: () => void
    toggleCalender: () => void
    left?: ReactNode
    right?: ReactNode
}

const cn = 'header'

export function Header(props: Props) {
    const { children, toggleMobileMenu, left, right, toggleCalender } = props
    return (
        <div className={cn}>
            <div className={`${cn}__header`}>
                <button
                    className={`${cn}__calendar-button`}
                    onClick={toggleCalender}
                >
                    <Icon icon="calendar" />
                </button>
            </div>
            <div className={`${cn}__sub-header`}>
                <div className={`${cn}__left`}>
                    <Icon
                        icon="bars"
                        className={`${cn}__menu-icon`}
                        onClick={toggleMobileMenu}
                    />
                    {left}
                </div>
                <div className={`${cn}__content`}>{children}</div>
                <div className={`${cn}__right`}>{right}</div>
            </div>
        </div>
    )
}
