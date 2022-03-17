const jwt = require('jsonwebtoken')
const Client = require('../models/authentifiaction/Client')


//Verifier que le client est toujours connecté et récuperer son id
const checkClient = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'RANDOM_TOKEN_SECRET', async(err, decodedToken) => {
            if (err) {
                res.locals.client = null
                next()
            } else {
                let client = await Client.findById(decodedToken.id)
                res.locals.client = client
                next()
            }
        })
    } else {
        res.locals.client = null
        next()
    }
}

module.exports = { checkClient }