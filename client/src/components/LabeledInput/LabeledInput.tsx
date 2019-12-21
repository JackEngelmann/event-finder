import './LabeledInput.scss'
import React from 'react'
import { ReactNode } from 'react'

type Props = {
    label: string
    children: ReactNode
}

const cn = 'labeled-input'

export function LabeledInput(props: Props) {
    const { label, children } = props
    return (
        <div className={cn}>
            <label>{label}</label>
            {children}
        </div>
    )
}
