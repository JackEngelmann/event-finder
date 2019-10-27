import { eventController } from "./controllers/eventController"
import { clubController } from "./controllers/clubController"

function routes(app) {
    app.route('/api/events')
        .get(eventController.getAllEvents)
    
    app.route('/api/events/:id')
        .get(eventController.getEvent)

    app.route('/api/clubs')
        .get(clubController.getAllClubs)

    app.route('/api/clubs/:id')
        .get(clubController.getClub)
}

export default routes
