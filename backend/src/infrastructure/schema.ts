import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    ###
    # club types
    ###

    type Club {
        address: String
        contact: String
        description: String
        email: String
        events(fromDay: String): [Event!]!
        id: Int!
        imageUrls: [String]!
        links: [Link!]!
        name: String!
        region: String
        specials: String
    }

    input CreateClubInput {
        address: String
        contact: String
        description: String
        email: String
        imageUrls: [String!]
        links: [LinkInput!]
        name: String!
        region: String
        specials: String
    }
    type CreateClubPayload {
        club: Club
    }

    input UpdateClubInput {
        address: String
        contact: String
        description: String
        email: String
        id: Int!
        imageUrls: [String!]
        links: [LinkInput!]
        name: String!
        region: String
        specials: String
    }
    type UpdateClubPayload {
        club: Club
    }

    type DeleteClubPayload {
        id: Int
    }

    ###
    # event types
    ###

    type Event {
        admissionFee: Float
        admissionFeeWithDiscount: Float
        amountOfFloors: Int
        club: Club!
        date: String!
        description: String
        genres: [Genre]!
        id: Int!
        imageUrls: [String!]
        links: [Link!]!
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
        imageUrls: [String!]
        links: [LinkInput!]
        minimumAge: Int
        name: String!
        priceCategory: Int
        special: String
    }
    type CreateEventPayload {
        event: Event
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
        imageUrls: [String!]
        links: [LinkInput!]
        minimumAge: Int
        name: String!
        priceCategory: Int
        special: String
    }
    type UpdateEventPayload {
        event: Event
    }

    type DeleteEventPayload {
        id: Int
    }

    input EventsQueryFilter {
        clubId: Int
        date: String
    }

    ###
    # genre types
    ###

    type Genre {
        id: Int!
        name: String!
    }

    ###
    # user types
    ###

    type User {
        id: Int!
        name: String
    }

    ###
    # image types
    ###

    input UploadImageInput {
        upload: Upload!
    }

    type UploadImagePayload {
        imageUrl: String!
    }

    ###
    # link types
    ###

    enum LinkType {
        FACEBOOK
        HOMEPAGE
    }

    type Link {
        id: Int!
        type: LinkType!
        href: String!
    }

    input LinkInput {
        type: LinkType!
        href: String!
    }

    ###
    # Root Query and Mutation
    ###

    type Query {
        club(id: Int!): Club
        clubs: [Club!]!
        event(id: Int!): Event
        events(filter: EventsQueryFilter): [Event!]!
        genre(id: Int!): Genre
        genres: [Genre!]!
        me: User
    }

    type Mutation {
        createEvent(input: CreateEventInput!): CreateEventPayload!
        updateEvent(input: UpdateEventInput!): UpdateEventPayload!
        deleteEvent(id: Int!): DeleteEventPayload!

        createClub(input: CreateClubInput!): CreateClubPayload!
        updateClub(input: UpdateClubInput!): UpdateClubPayload!
        deleteClub(id: Int!): DeleteClubPayload!

        uploadImage(input: UploadImageInput!): UploadImagePayload!
    }
`
