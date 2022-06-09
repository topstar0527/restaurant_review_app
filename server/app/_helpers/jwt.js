const expressJwt = require('express-jwt')
const config = require('../config/secret.config')

module.exports = jwt

function jwt() {
    const { secret } = config
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/users/login',
            '/users/register'
        ]
    })
}