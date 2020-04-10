import express from 'express'
import images from './images'
import login from './login'
import sitemap from './sitemap'

const app = express()

app.use('/images', images)
app.use('/login', login)
app.use(sitemap)

export default app
