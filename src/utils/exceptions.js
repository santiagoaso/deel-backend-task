class NotFoundException extends Error {
    constructor(msg) {
        super();
        this.message = msg
        this.statusCode = 404
    }
}
class ValidationException extends Error {
    constructor(msg) {
        super();
        this.message = msg
        this.statusCode = 400
    }
}

class QueryException extends Error {
    constructor(msg) {
        super();
        this.message = msg
        this.statusCode = 500
    }
}

module.exports = {
    NotFoundException,
    ValidationException,
    QueryException
}