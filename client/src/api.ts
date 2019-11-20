import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

export type Club = {
    id: number
    name: string
    address?: string
    region?: string
    contact?: string
    email?: string
    specials?: string
    description?: string
    link?: string
}

export type Genre = {
    id: number
    name: string
}

export type Event = {
    admissionFee: number | undefined
    admissionFeeWithDiscount: number | undefined
    amountOfFloors: number | undefined
    club: Club
    date: string
    description: string
    genres: Genre[] | undefined
    id: number
    imageUrl: string
    link?: string
    minimumAge: number | undefined
    name: string
    priceCategory: 1 | 2 | 3 | undefined
    special: string | undefined
}

const uploadLink = createUploadLink()
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    }
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, uploadLink]),
})
