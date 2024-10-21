import express from 'express'
import images from './images'
import login from './login'
import sitemap from './sitemap'
import resetDatabase from './resetDatabase'

const app = express()

app.use('/images', images)
app.use('/login', login)
app.use('/reset-database', resetDatabase)
app.use(sitemap)

export default app
