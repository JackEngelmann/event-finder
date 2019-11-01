import { IResolvers } from "graphql-tools";
import { Database } from "sqlite3";
import { queryEvent } from "../queries/event";
import { queryEvents } from "../queries/events";
import { queryClubs } from "../queries/clubs";
import { queryClub } from "../queries/club";
import { queryGenre } from "../queries/genre";
import { queryGenres } from "../queries/genres";
import { queryGenresForEvent } from "../queries/genresForEvent";
import { createEvent } from "../mutations/createEvent";

type Source = {
    clubId: number
    id: number
}
type Context = {
    db: Database
}

export const resolvers: IResolvers<Source, Context> = {
    Query: {
        clubs: (obj, args, appContext, info) => queryClubs(appContext),
        club: (obj, args, appContext, info) => queryClub(appContext, parseInt(args.id)),
        events: (obj, args, appContext, info) => queryEvents(appContext, args.filter),
        event: (obj, args, appContext, info) => queryEvent(appContext, parseInt(args.id)),
        genre: (obj, args, appContext, info) => queryGenre(appContext, parseInt(args.id)),
        genres: (obj, args, appContext, info) => queryGenres(appContext),
    },
    Mutation: {
        createEvent: async (obj, args, appContext, info) => {
            const eventId = await createEvent(appContext, args.input)
            const event = await queryEvent(appContext, eventId)
            return { event }
        },
    },
    Event: {
        club: (event, args, appContext, info) => queryClub(appContext, event.clubId),
        genres: (event, args, appContext, info) => queryGenresForEvent(appContext, event.id)
    }
}