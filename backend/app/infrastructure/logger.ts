import moment from 'moment'

export class Logger {
    writeToLog(message: any, mode: string) {
        console.log(`[${moment().toISOString()}][${mode}] ${message}`)
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
