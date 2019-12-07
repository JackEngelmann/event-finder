import { UserDataModel } from "./database/entity/user";
import { Connection } from "typeorm";

export type AppContext = { db: Connection, isAdmin: boolean, user?: UserDataModel }