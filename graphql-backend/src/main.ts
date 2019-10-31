import { startServer, stopServer } from './graphql/server'

if (module.hot) {
    startServer()
    module.hot.accept();
    module.hot.dispose(async () => {
        const promise = await stopServer()
        console.log('stopped server')
        return promise
    });
} else {
    startServer()
}
