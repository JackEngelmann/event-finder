import React from 'react'
import { ClubList } from '../components/ClubList'
import { ClubListItem } from '../components/ClubListItem'
import { useHistory } from 'react-router'
import { useClubs } from './useClubs'

export function ClubListContainer() {
    const clubs = useClubs()[0] || []
    const history = useHistory()
    return (
        <ClubList
            clubs={clubs}
            renderClub={club => (
                <ClubListItem
                    key={club.name}
                    club={club}
                    onClick={() => history.push(`/club/${club.id}`)}
                />
            )}
            showFirst={15}
        />
    )
}
