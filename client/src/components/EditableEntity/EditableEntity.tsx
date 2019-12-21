import './EditableEntity.scss'
import React, { ReactNode } from 'react'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'

type Props = {
    onEdit?: (() => void) | undefined
    onDelete?: (() => void) | undefined
    onShow?: (() => void) | undefined
    children: ReactNode
}

const cn = 'editable-entity'

export function EditableEntity(props: Props) {
    const { onEdit, onDelete, children, onShow } = props
    return (
        <div className={cn}>
            <div className={`${cn}__entity-actions`}>
                <Button onClick={onEdit} disabled={!onEdit} secondary>
                    <Icon icon="pen"/>
                </Button>
                <Button onClick={onShow} disabled={!onDelete} secondary>
                    <Icon icon="eye" />
                </Button>
                <Button onClick={onDelete} disabled={!onDelete} danger>
                    <Icon icon="trash-alt" />
                </Button>
            </div>
            <div className={`${cn}__entity-name`}>{children}</div>
        </div>
    )
}
