import { startServer, stopServer } from './graphql/server'
import dotenv from 'dotenv'

dotenv.config()

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
