import { Database } from "./database/database";
import { UserDataModel } from "./database/models/user";

export type AppContext = { db: Database, isAdmin: boolean, user?: UserDataModel }