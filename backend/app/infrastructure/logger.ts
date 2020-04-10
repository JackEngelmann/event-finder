import { appendFile } from 'fs'
import moment from 'moment'

export class Logger {
    writeToLog(message: any, mode: string) {
        appendFile(
            './log.txt',
            `[${moment().toISOString()}][${mode}] ${message}\n`,
            err => {}
        )
    }
    error(message: any) {
        this.writeToLog(message, 'error')
        if (process.env.NODE_ENV !== 'test') {
            console.error(message)
        }
    }
    info(message: any) {
        this.writeToLog(message, 'info')
        if (process.env.NODE_ENV !== 'test') {
            console.info(message)
        }
    }
}
