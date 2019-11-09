import { IResolvers } from "graphql-tools";
import { queryEvent } from "../queries/event";
import { queryEvents } from "../queries/events";
import { queryClubs } from "../queries/clubs";
import { queryClub } from "../queries/club";
import { queryGenre } from "../queries/genre";
import { queryGenres } from "../queries/genres";
import { queryGenresForEvent } from "../queries/genresForEvent";
import { createEvent } from "../mutations/createEvent";
import { updateEvent } from "../mutations/updateEvent";
import { deleteEvent } from "../mutations/deleteEvent";
import { createClub } from "../mutations/createClub";
import { updateClub } from "../mutations/updateClub";
import { deleteClub } from "../mutations/deleteClub";
import { Database } from "../database/database";

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
        club: (obj, args, appContext, info) => queryClub(appContext, args.id),
        events: (obj, args, appContext, info) => queryEvents(appContext, args.filter),
        event: (obj, args, appContext, info) => queryEvent(appContext, args.id),
        genre: (obj, args, appContext, info) => queryGenre(appContext, args.id),
        genres: (obj, args, appContext, info) => queryGenres(appContext),
    },
    Mutation: {
        createEvent: async (obj, args, appContext, info) => {
            const eventId = await createEvent(appContext, args.input)
            const event = await queryEvent(appContext, eventId)
            return { event }
        },
        updateEvent: async (obj, args, appContext, info) => {
            await updateEvent(appContext, args.input)
            const event = await queryEvent(appContext, args.input.id)
            return { event }
        },
        deleteEvent: async (obj, args, appContext, info) => {
            await deleteEvent(appContext, args.id)
            return { id: args.id }
        },
        createClub: async (obj, args, appContext, info) => {
            const clubId = await createClub(appContext, args.input)
            const club = await queryClub(appContext, clubId)
            return { club }
        },
        updateClub: async (obj, args, appContext, info) => {
            await updateClub(appContext, args.input)
            const club = await queryClub(appContext, args.input.id)
            return { club }
        },
        deleteClub: async (obj, args, appContext, info) => {
            await deleteClub(appContext, args.id)
            return { id: args.id }
        }
    },
    Event: {
        club: (event, args, appContext, info) => queryClub(appContext, event.clubId),
        genres: (event, args, appContext, info) => queryGenresForEvent(appContext, event.id)
    }
}