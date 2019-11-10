import { startServer, stopServer } from './graphql/server'

if ((module as any).hot) {
    startServer()
    ;(module as any).hot.accept()
    ;(module as any).hot.dispose(async () => {
        const promise = await stopServer()
        console.log('stopped server')
        return promise
    })
} else {
    startServer()
}
