import http from 'http'
import 'dotenv/config'
import app from './app'
import logger from './infrastructure/logger'

const PORT = process.env.PORT || 5000

const server = http.createServer(app).listen({ port: PORT }, () => {
    logger.info(`server started on port ${PORT}`)
})

export default server
