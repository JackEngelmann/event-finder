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
    id: number
    name: string
    description: string
    date: string
    club: Club
    imageUrl: string
    priceCategory: 1 | 2 | 3 | undefined
    admissionFee: number | undefined
    admissionFeeWithDiscount: number | undefined
    special: string | undefined
    minimumAge: number | undefined
    amountOfFloors: number | undefined
    genres: Genre[] | undefined
}

export const apolloClient = new ApolloClient()