import { Express } from 'express'
import passport from 'passport'

export function addLoginRoute(app: Express) {
    app.post(
        '/login',
        passport.authenticate('local', {
            successRedirect: '/#/admin',
            failureRedirect: '/#/login',
        })
    )
}
