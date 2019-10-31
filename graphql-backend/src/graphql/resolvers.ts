import { IResolvers } from "graphql-tools";
import { Database } from "sqlite3";
import ClubService from '../services/clubService'
import EventService from '../services/eventService'

type Source = {
    clubId: number
}
type Context = {
    db: Database
}

export const resolvers: IResolvers<Source, Context> = {
    Query: {
        clubs: (obj, args, context, info) => {
            const clubService = new ClubService(context.db)
            return clubService.getAllClubs()
        },
        club: (obj, args, context, info) => {
            const clubService = new ClubService(context.db)
            const clubId = args.id;
            return clubService.getClub(clubId)
        },
        events: (obj, args, context, info) => {
            const eventService = new EventService(context.db)
            return eventService.getAllEvents();
        },
        event: (obj, args, context, info) => {
            const eventId = args.id;
            const eventService = new EventService(context.db)
            return eventService.getEvent(eventId);
        },
    },
    Event: {
        club(event, args, context, info) {
            const eventId = event.clubId
            const clubService = new ClubService(context.db)
            return clubService.getClub(eventId);
        }
    }
}