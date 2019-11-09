import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Club, Genre, Event } from "../api";

const QUERY = gql`
    query eventQuery($eventId: Int!) {
        event(id: $eventId) {
            admissionFee
            admissionFeeWithDiscount
            amountOfFloors
            club {
                id
                name
            }
            date
            description
            genres {
                id
                name
            }
            id
            imageUrl
            minimumAge
            name
            priceCategory
            special
        }
    }
`

export type EventWithDetails = Pick<
    Event,
    | 'admissionFee'
    | 'admissionFeeWithDiscount'
    | 'amountOfFloors'
    | 'date'
    | 'description'
    | 'id'
    | 'imageUrl'
    | 'minimumAge'
    | 'name'
    | 'priceCategory'
    | 'special'
> & {
    club: Pick<Club, 'id' | 'name'>
    genres: Pick<Genre, 'id' | 'name'>[]
}

type QueryData = {
    event: EventWithDetails
}

export function useEventWithDetails(eventId: number) {
    const queryResult = useQuery<QueryData>(QUERY, {
        variables: { eventId: eventId }
    })
    const event = queryResult.data && queryResult.data.event
    return [event, queryResult] as const
}