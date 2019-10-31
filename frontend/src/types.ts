export type Club = {
    name: string
}

export type Event = {
    id: string
    name: string
    description: string
    date: string
    club: Club
    imageUrl: string
}