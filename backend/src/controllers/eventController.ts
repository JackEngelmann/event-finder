import db from '../database'
import EventService from '../services/eventService'

function getAllEvents(req, res) {
    const eventService = new EventService(db)
    eventService
        .getAllEvents()
        .then(events => res.json(events))
        .catch(reason => res.json(reason))
}

function getEvent(req, res) {
    const eventService = new EventService(db)
    eventService
        .getEvent(parseInt(req.params.id))
        .then(event => res.json(event))
        .catch(reason => res.json(reason))
}

export const eventController = {
    getAllEvents,
    getEvent
}