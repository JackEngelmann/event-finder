import { IResolvers } from 'graphql-tools'
import { queryEvent } from '../event/queries/event'
import { queryEvents } from '../event/queries/events'
import { queryClubs } from '../club/queries/clubs'
import { queryClub } from '../club/queries/club'
import { queryGenre } from '../genre/queries/genre'
import { queryGenres } from '../genre/queries/genres'
import { queryGenresForEvent } from '../genre/queries/genresForEvent'
import { createEvent } from '../event/commands/createEvent'
import { updateEvent } from '../event/commands/updateEvent'
import { deleteEvent } from '../event/commands/deleteEvent'
import { createClub } from '../club/commands/createClub'
import { updateClub } from '../club/commands/updateClub'
import { deleteClub } from '../club/commands/deleteClub'
import { AppContext } from './appContext'
import { requireAdminPermission } from '../auth/authentication'
import logger from './logger'
import { uploadImage } from '../image/commands/uploadImages'
import { queryImageUrlsForEvent } from '../image/queries/imageUrlsForEvent'
import { queryImageUrlsForClub } from '../image/queries/imageUrlsForClub'
import { queryEventsForClub } from '../event/queries/eventsForClub'
import { queryLinksForEvent } from '../link/queries/linksForEvent'
import { queryLinksForClub } from '../link/queries/linksForClub'

type Source = {
    clubId: number
    id: number
}

export const resolvers: IResolvers<Source, AppContext> = {
    Query: {
        clubs: (obj, args, appContext, info) => {
            logger.info('query clubs')
            return queryClubs(appContext)
        },
        club: (obj, args, appContext, info) => {
            logger.info('query club')
            return queryClub(appContext, args.id)
        },
        events: (obj, args, appContext, info) => {
            logger.info('query events')
            return queryEvents(appContext, args.filter)
        },
        event: (obj, args, appContext, info) => {
            logger.info('query event')
            return queryEvent(appContext, args.id)
        },
        genre: (obj, args, appContext, info) => {
            logger.info('query genre')
            return queryGenre(appContext, args.id)
        },
        genres: (obj, args, appContext, info) => {
            logger.info('query genres')
            return queryGenres(appContext)
        },
        me: (obj, args, appContext, info) => {
            logger.info('query me')
            return appContext.user
        },
    },
    Mutation: {
        createEvent: async (obj, args, appContext, info) => {
            requireAdminPermission(appContext)
            const eventId = await createEvent(appContext, args.input)
            const event = await queryEvent(appContext, eventId)
            return { event }
        },
        updateEvent: async (obj, args, appContext, info) => {
            requireAdminPermission(appContext)
            await updateEvent(appContext, args.input)
            const event = await queryEvent(appContext, args.input.id)
            return { event }
        },
        deleteEvent: async (obj, args, appContext, info) => {
            requireAdminPermission(appContext)
            await deleteEvent(appContext, args.id)
            return { id: args.id }
        },
        createClub: async (obj, args, appContext, info) => {
            requireAdminPermission(appContext)
            const clubId = await createClub(appContext, args.input)
            const club = await queryClub(appContext, clubId)
            return { club }
        },
        updateClub: async (obj, args, appContext, info) => {
            requireAdminPermission(appContext)
            await updateClub(appContext, args.input)
            const club = await queryClub(appContext, args.input.id)
            return { club }
        },
        deleteClub: async (obj, args, appContext, info) => {
            requireAdminPermission(appContext)
            await deleteClub(appContext, args.id)
            return { id: args.id }
        },
        uploadImage: async (obj, args, appContext, info) => {
            requireAdminPermission(appContext)
            const imageUrl = await uploadImage(appContext, args.input)
            return { imageUrl }
        },
    },
    Event: {
        club: (event, args, appContext, info) => {
            return queryClub(appContext, event.clubId)
        },
        genres: (event, args, appContext, info) =>
            queryGenresForEvent(appContext, event.id),
        imageUrls: (event, args, appContext, info) =>
            queryImageUrlsForEvent(appContext, event.id),
        links: (event, args, appContext, info) =>
            queryLinksForEvent(appContext, event.id),
    },
    Club: {
        imageUrls: (club, args, appContext, info) =>
            queryImageUrlsForClub(appContext, club.id),
        events: (club, args, appContext, info) =>
            queryEventsForClub(appContext, club.id, args.fromDay),
        links: (club, args, appContext, info) =>
            queryLinksForClub(appContext, club.id),
    },
}
