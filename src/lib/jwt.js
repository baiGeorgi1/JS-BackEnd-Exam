
const util = require('util');
const jwtToken = require('jsonwebtoken');

const jwt = {
    sign: util.promisify(jwtToken.sign),
    verify: util.promisify(jwtToken.verify)
};
module.exports = jwt;