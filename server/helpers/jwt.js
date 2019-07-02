const expressJwt = require('express-jwt');
const config = require('../config');
const userService = require('../routes/userService');

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked}).unless({
        path: [
            //public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {

    const user = await userService.getById(payload.sub);

    //revoke if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();

}

module.exports = jwt;
