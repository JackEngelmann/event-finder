import http from 'http'
import app from '../../app'

const PORT = process.env.PORT || 5000

/**
 * Imperatives to start and stop the server
 * (used for testing, hot-reloading)
 */

const server = http.createServer(app).listen({ port: PORT }, () => {
    console.log(`server started on port ${PORT}`)
})

export default server

/*
let currentApp = app

if (module.hot) {
    module.hot.accept(['./server', './schema'], () => {
        server.removeListener('request', currentApp)
        server.on('request', app)
        currentApp = app
    })
}

*/
