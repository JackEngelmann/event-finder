import express from 'express'
import routes from './routes'

const app = express()

app.use(express.static('public'))

routes(app)

export default app