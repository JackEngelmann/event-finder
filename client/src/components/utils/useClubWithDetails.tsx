import gql from 'graphql-tag'
import { Club } from '../../api'
import { useQuery } from '@apollo/react-hooks'

export const CLUB_WITH_DETAILS_QUERY = gql`
    query ClubWithDetails($id: Int!) {
        club(id: $id) {
            address
            contact
            description
            email
            id
            imageUrls
            link
            name
            region
            specials
        }
    }
`
type QueryResult = {
    club: Pick<
        Club,
        | 'address'
        | 'contact'
        | 'description'
        | 'email'
        | 'id'
        | 'imageUrls'
        | 'link'
        | 'name'
        | 'region'
        | 'specials'
    >
}

export function useClubWithDetails(clubId: number) {
    const clubQueryResult = useQuery<QueryResult>(CLUB_WITH_DETAILS_QUERY, {
        variables: { id: clubId }
    })
    const club = clubQueryResult.data && clubQueryResult.data.club
    return [club, clubQueryResult] as const
}
