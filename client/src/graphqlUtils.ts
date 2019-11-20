import gql from 'graphql-tag'
import { Event, Club, Genre } from './api'

export const eventDetailsFragment = gql`
    fragment EventDetails on Event {
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
        link
        minimumAge
        name
        priceCategory
        special
    }
`

export type EventDetailsEvent = Pick<
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
