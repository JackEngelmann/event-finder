import { appendFile } from "fs"
import moment = require("moment")

export class Logger {
    writeToLog(message: any, mode: string) {
        appendFile('./log.txt', `[${moment().toISOString()}][${mode}] ${message}\n`, err => {})
    }
    error(message: any) {
        this.writeToLog(message, 'error')
        console.error(message)
    }
    info(message: any) {
        this.writeToLog(message, 'info')
        console.info(message)
    }
}