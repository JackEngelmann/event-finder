import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

export type Club = {
  address?: string
  contact?: string
  description?: string
  email?: string
  id: number
  imageUrls?: string[]
  links?: { href: string; type: 'FACEBOOK' | 'HOMEPAGE' }[]
  name: string
  region?: string
  specials?: string
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
  genres: Genre[]
  id: number
  imageUrls?: string[]
  links: { href: string; type: 'FACEBOOK' | 'HOMEPAGE' }[]
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
