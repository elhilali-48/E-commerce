const express  = require('express')

const routesauth = require('./routes/authentification/client')
const routesAuthUser = require('./routes/authentification/user')
const routesres = require('../routes/gestion_utilisateur/responsable')
const routescli = require('./routes/gestion_utilisateur/client')

const app = express()



 app.use("/responsable/gestion",routesres)



module.exports =app
