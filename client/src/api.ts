import ApolloClient from 'apollo-boost'

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
    minimumAge: number | undefined
    name: string
    priceCategory: 1 | 2 | 3 | undefined
    special: string | undefined
}

export const apolloClient = new ApolloClient()