const SEVERITY_INFO = 'INFO'
const SEVERITY_ERROR ='ERROR'
const SEVERITY_WARNING ='WARNING'
const SEVERITY_DEBUG ='DEBUG'

class Logger {
    static error(code, extras = {}) {
        Logger.log(SEVERITY_ERROR, code, extras)
    }

    static warning(code, extras = {}) {
        Logger.log(SEVERITY_WARNING, code, extras)
    }

    static info(code, extras = {}) {
        Logger.log(SEVERITY_INFO, code, extras)
    }

    static debug(code, extras = {}) {
        Logger.log(SEVERITY_DEBUG, code, extras)
    }

    static log(severity, code, extras) {
        const message = Logger.getMessage(code, extras)
        if (Logger.isStdoutEnabled()) {
            Logger.stdout(severity + ' | ' + message)
        }
    }

    static isStdoutEnabled() {
        return true // This should be set on process.env. This is only an example to see how logs work
    }

    static getMessage(code, extras) {
        return JSON.stringify({code: code , ...extras})
    }

    static stdout(msg) {
        console.log(msg)
    }
}

module.exports = Logger