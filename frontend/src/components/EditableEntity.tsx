import './EditableEntity.scss'
import React, { ReactNode } from 'react'

type Props = {
    onEdit?: (() => void) | undefined
    onDelete?: (() => void) | undefined
    children: ReactNode
}

const cn = 'editable-entity'

export function EditableEntity(props: Props) {
    const { onEdit, onDelete, children } = props
    return (
        <div className={cn}>
            <div className={`${cn}__entity-actions`}>
                <button onClick={onEdit} disabled={!onEdit}>
                    Edit
                </button>
                <button onClick={onDelete} disabled={!onDelete}>
                    Delete
                </button>
            </div>
            <div className={`${cn}__entity-name`}>{children}</div>
        </div>
    )
}
