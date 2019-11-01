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
        id: Int!
        name: String!
        description: String
        date: String!
        club: Club!
        imageUrl: String
        genres: [Genre]!
        special: String
        priceCategory: Int
        admissionFee: Float
        admissionFeeWithDiscount: Float
        minimumAge: Int
        amountOfFloors: Int
    }

    input CreateEventInput {
        name: String!
        description: String
        date: String!
        clubId: Int!
        genreIds: [Int]
        special: String
        priceCategory: Int
        admissionFee: Float
        admissionFeeWithDiscount: Float
        minimumAge: Int
        amountOfFloors: Int
    }

    input UpdateEventInput {
        id: Int!
        name: String!
        description: String
        date: String!
        clubId: Int!
        genreIds: [Int]
        special: String
        priceCategory: Int
        admissionFee: Float
        admissionFeeWithDiscount: Float
        minimumAge: Int
        amountOfFloors: Int
    }

    type CreateEventPayload {
        event: Event
    }

    type UpdateEventPayload {
        event: Event!
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
    }
`
