import React, { ComponentProps } from 'react'
import './ClubListItem.scss'


type Club = {
    name: string
}
type Props = { club: Club } & ComponentProps<'div'>

export function ClubListItem(props: Props) {
    const { club, ...divProps } = props;
    return (
        <div className="club-list-item" {...divProps}>
            {club.name}
        </div>
    )
}