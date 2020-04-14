import { IResolvers } from 'graphql-tools'
import { queryEvent } from '../components/event/queries/event'
import { queryEvents } from '../components/event/queries/events'
import { queryClubs } from '../components/club/queries/clubs'
import { queryClub } from '../components/club/queries/club'
import { queryGenre } from '../components/genre/queries/genre'
import { queryGenres } from '../components/genre/queries/genres'
import { queryGenresForEvent } from '../components/genre/queries/genresForEvent'
import { createEvent } from '../components/event/commands/createEvent'
import { updateEvent } from '../components/event/commands/updateEvent'
import { deleteEvent } from '../components/event/commands/deleteEvent'
import { createClub } from '../components/club/commands/createClub'
import { updateClub } from '../components/club/commands/updateClub'
import { deleteClub } from '../components/club/commands/deleteClub'
import { AppContext } from './appContext'
import { requireAdminPermission } from '../components/auth/authentication'
import { Logger } from './logger'
import { uploadImage } from '../components/image/commands/uploadImages'
import { queryImageUrlsForEvent } from '../components/image/queries/imageUrlsForEvent'
import { queryImageUrlsForClub } from '../components/image/queries/imageUrlsForClub'
import { queryEventsForClub } from '../components/event/queries/eventsForClub'
import { queryLinksForEvent } from '../components/link/queries/linksForEvent'
import { queryLinksForClub } from '../components/link/queries/linksForClub'

type Source = {
    clubId: number
    id: number
}

const logger = new Logger()

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
