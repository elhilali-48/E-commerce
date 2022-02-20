const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const routesauth = require('./routes/authentification/client')
const routesAuthUser = require('./routes/authentification/user')
const routesres = require('./routes/gestion_utilisateur/responsable')
const routescli = require('./routes/gestion_utilisateur/client')
const routesarticle = require('./routes/gestion_de_vente/article')
const routesproduit = require('./routes/gestion_de_vente/produit')

const cookieParser = require('cookie-parser')
const { checkClient } = require('./midlleware/authentifiaction')

const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0.nctg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })

.then(() => console.log("connextion reussi "))
.catch(()=> console.log("connextion echoué "));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.get('*', checkClient)
app.get('/', (req, res) => res.render('register'))

app.use(routesauth)
app.use("/responsable/gestion",routesres)
app.use(routesAuthUser)
app.use("/client/gestion",routescli)
app.use("/responsable/article", routesarticle)
app.use("/responsable/produit", routesproduit)
module.exports = app;