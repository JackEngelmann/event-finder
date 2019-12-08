import { appendFile } from "fs"
import moment = require("moment")

export class Logger {
    writeToLog(message: any) {
        appendFile('./log.txt', moment().format('YYYY-MM-DD') + ': ' + String(message) + '\n', err => {})
    }
    error(message: any) {
        this.writeToLog(message)
        console.error(message)
    }
    info(message: any) {
        this.writeToLog(message)
        console.info(message)
    }
}