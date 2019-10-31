import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Club {
        id: Int!
        name: String!
    }

    type Event {
        id: Int!
        name: String!
        description: String
        date: String!
        club: Club!
        imageUrl: String
    }

    type Query {
        club(id: Int!): Club
        clubs: [Club!]!
        event(id: Int!): Event
        events: [Event!]!
    }
`
