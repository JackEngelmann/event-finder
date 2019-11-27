import React, { ReactNode } from 'react'
import './MobileMenu.scss'

type Props = {
    children: ReactNode
}
const cn = 'mobile-menu'
export function MobileMenu(props: Props) {
    return <div className={cn}>{props.children}</div>
}
