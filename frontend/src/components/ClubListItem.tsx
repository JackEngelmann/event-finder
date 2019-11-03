import React, { ComponentProps } from 'react'
import './ClubListItem.scss'

type Club = {
    name: string
}
type Props = { club: Club } & ComponentProps<'div'>

const cn = 'club-list-item'

export function ClubListItem(props: Props) {
    const { club, ...divProps } = props
    return (
        <div className={cn} {...divProps}>
            {club.name}
        </div>
    )
}
