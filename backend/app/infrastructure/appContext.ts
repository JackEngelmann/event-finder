import { UserDataModel } from '../auth/orm/user'
import { Connection } from 'typeorm'

export type AppContext = {
    db: Connection
    isAdmin: boolean
    user?: UserDataModel
}
