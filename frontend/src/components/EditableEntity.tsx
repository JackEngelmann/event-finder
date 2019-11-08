import './EditableEntity.scss'
import React, { ReactNode } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'

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
                <Button onClick={onEdit} disabled={!onEdit} secondary>
                    <Icon icon="pen"/>
                </Button>
                <Button onClick={onDelete} disabled={!onDelete} danger>
                    <Icon icon="trash-alt" />
                </Button>
            </div>
            <div className={`${cn}__entity-name`}>{children}</div>
        </div>
    )
}
