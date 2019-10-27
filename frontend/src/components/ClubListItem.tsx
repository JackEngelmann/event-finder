import React from 'react'
import { Club } from '../api'
import './ClubListItem.css'

type Props = {
    club: Club
}

export function ClubListItem(props: Props) {
    const { club } = props;
    return (
        <div className="club-list-item">
            {club.name}
        </div>
    )
}