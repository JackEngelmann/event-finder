import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Club {
        id: Int!
        name: String!
        address: String
        region: String
        contact: String
        email: String
        specials: String
        description: String
        link: String
    }

    type Event {
        admissionFee: Float
        admissionFeeWithDiscount: Float
        amountOfFloors: Int
        club: Club!
        date: String!
        description: String
        genres: [Genre]!
        id: Int!
        imageUrl: String
        link: String
        minimumAge: Int
        name: String!
        priceCategory: Int
        special: String
    }

    input CreateEventInput {
        admissionFee: Float
        admissionFeeWithDiscount: Float
        amountOfFloors: Int
        clubId: Int!
        date: String!
        description: String
        genreIds: [Int]
        image: Upload
        imageUrl: String
        link: String
        minimumAge: Int
        name: String!
        priceCategory: Int
        special: String
    }

    input UpdateEventInput {
        admissionFee: Float
        admissionFeeWithDiscount: Float
        amountOfFloors: Int
        clubId: Int!
        date: String!
        description: String
        genreIds: [Int]
        id: Int!
        image: Upload
        imageUrl: String
        link: String
        minimumAge: Int
        name: String!
        priceCategory: Int
        special: String
    }

    input CreateClubInput {
        address: String
        contact: String
        description: String
        email: String
        link: String
        name: String!
        region: String
        specials: String
    }

    input UpdateClubInput {
        address: String
        contact: String
        description: String
        email: String
        id: Int!
        link: String
        name: String!
        region: String
        specials: String
    }

    type UpdateClubPayload {
        club: Club
    }

    type CreateClubPayload {
        club: Club
    }

    type DeleteClubPayload {
        id: Int
    }

    type CreateEventPayload {
        event: Event
    }

    type UpdateEventPayload {
        event: Event
    }

    type DeleteEventPayload {
        id: Int
    }

    type Genre {
        id: Int!
        name: String!
    }

    input EventsQueryFilter {
        date: String
    }

    type Query {
        club(id: Int!): Club
        clubs: [Club!]!
        event(id: Int!): Event
        events(filter: EventsQueryFilter): [Event!]!
        genre(id: Int!): Genre
        genres: [Genre!]!
    }

    type Mutation {
        createEvent(input: CreateEventInput!): CreateEventPayload!
        updateEvent(input: UpdateEventInput!): UpdateEventPayload!
        deleteEvent(id: Int!): DeleteEventPayload!

        createClub(input: CreateClubInput!): CreateClubPayload!
        updateClub(input: UpdateClubInput!): UpdateClubPayload!
        deleteClub(id: Int!): DeleteClubPayload!
    }
`
