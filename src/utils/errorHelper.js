const { MongooseError } = require('mongoose');
//22 error handler
exports.getErrorMessage = (err) => {
    if (err instanceof MongooseError) {
        return Object.values(err.errors).at(0).message;
    } else {
        return err.message;
    }


};