const { secret } = require("../config/secret.config.js")
const jwt = require('express-jwt')

module.exports = authorize

function authorize (roles= []){

    if(typeof roles === 'string') roles=[roles]
    
    return [
        jwt({secret, algorithms:['HS256']}),
        (req, res, next) => {
            if(roles.length && !roles.includes(req.user.role)){
                return res.status(401).send({message: "Unauthorized or you have no permisstion for this action"})
            }
            next()
        }
    ]
} 

