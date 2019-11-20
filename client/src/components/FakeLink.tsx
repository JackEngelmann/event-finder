import React, { ReactNode } from 'react'
import './FakeLink.scss'

type Props = {
    onClick: () => void
    children: ReactNode
}

const cn = 'fake-link'

export function FakeLink(props: Props) {
    const { children, onClick } = props
    return <span onClick={onClick} className={cn}>{children}</span>
}
