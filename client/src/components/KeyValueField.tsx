import './KeyValueField.scss'
import React from 'react'

type Props = {
    fieldKey: string
    fieldValue: string | undefined
}

const cn = 'key-value-field'

export function KeyValueField(props: Props) {
    const { fieldKey, fieldValue } = props
    if (!fieldValue) return null
    return (
        <div className={cn}>
            <div className={`${cn}__value`}>{fieldValue}</div>
            <div className={`${cn}__key`}>{fieldKey}</div>
        </div>
    )
}