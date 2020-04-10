import server from './bin/www/server'

server

if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => server.close())
}
