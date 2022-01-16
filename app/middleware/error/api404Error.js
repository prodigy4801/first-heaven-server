const HttpStatusCodes = require("./httpStatusCode.middleware");
const BaseError = require("./baseError.middleware");

class Api404Error extends BaseError {
    constructor(name, statusCode = HttpStatusCodes.NOT_FOUND,
        description = 'Not found.', 
        isOperational = true){
            super(name, statusCode, isOperational, description)
        }
}

module.exports = Api404Error;