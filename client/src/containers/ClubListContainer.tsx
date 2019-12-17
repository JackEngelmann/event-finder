import React from 'react'
import { ClubList } from '../components/ClubList'
import { ClubListItem } from '../components/ClubListItem'
import { useHistory } from 'react-router'
import { useClubs } from './useClubs'
import { NetworkError } from '../components/NetworkError'

export function ClubListContainer() {
    const [clubs, clubsQueryResult] = useClubs()
    const history = useHistory()
    if (clubsQueryResult.error) return <NetworkError />
    return (
        <ClubList
            clubs={clubs || []}
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
