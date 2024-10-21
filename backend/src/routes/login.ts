import express from 'express'
import passport from 'passport'

const app = express()

app.post(
    '/',
    passport.authenticate('local', {
        successRedirect: '/#/admin',
        failureRedirect: '/#/login',
    })
)

export default app
