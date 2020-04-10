import { UserDataModel } from '../components/auth/orm/user'
import { Connection } from 'typeorm'

export type AppContext = {
    db: Connection
    isAdmin: boolean
    user?: UserDataModel
}
