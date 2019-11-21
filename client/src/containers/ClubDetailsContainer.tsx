import React from 'react'
import gql from 'graphql-tag'
import { Club } from '../api'
import { useQuery } from '@apollo/react-hooks'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { ClubDetails } from '../components/ClubDetails'

type Props = {
    clubId: number
}

const CLUB_QUERY = gql`
    query clubQuery($clubId: Int!) {
        club(id: $clubId) {
            address
            contact
            description
            email
            id
            imageUrl
            link
            name
            region
            specials
        }
    }
`
type ClubQueryData = {
    club: Pick<
        Club,
        | 'id'
        | 'name'
        | 'address'
        | 'region'
        | 'contact'
        | 'email'
        | 'specials'
        | 'description'
        | 'link'
        | 'imageUrl'
    >
}

export function ClubDetailsContainer(props: Props) {
    const { clubId } = props
    const clubQueryResult = useQuery<ClubQueryData>(CLUB_QUERY, {
        variables: { clubId },
    })
    const club = clubQueryResult.data && clubQueryResult.data.club
    if (!club) return <LoadingIndicator />
    return <ClubDetails club={club} />
}
