import server from './server'

server

if (module.hot) {
    module.hot.accept()
    module.hot.dispose(async () => {
        server.close()
    })
}
