import http from 'http'
import 'dotenv/config'
import app from '../../app'

const PORT = process.env.PORT || 5000

const server = http.createServer(app).listen({ port: PORT }, () => {
    console.log(`server started on port ${PORT}`)
})

export default server
