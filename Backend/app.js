const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// on a affecter les chemain de routes dans une variable pour les utiliser plus tard
const routesauth = require("./routes/authentification/client");
const routesAuthUser = require("./routes/authentification/user");
const routesres = require("./routes/gestion_utilisateur/responsable");
const routescli = require("./routes/gestion_utilisateur/client");
const routesarticle = require("./routes/gestion_de_vente/article");
const routesproduit = require("./routes/gestion_de_vente/produit");
const routescategorie = require("./routes/gestion_de_vente/categorie");
const routespanier = require("./routes/livraison/panier");
const routescommentaire = require("./routes/gestion_de_vente/commentaire");
const routecommande = require("./routes/livraison/commande");
const routespaiment = require("./routes/livraison/paiment");
const routeslivraison = require("./routes/livraison/livraison");

const cookieParser = require("cookie-parser");

const stripepublic = process.env.STRIPE_KEY_PUBLIC;
const app = express();

// elle permet de donner accée du frontend ver le backend
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

// on connecte la base de donné
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.nctg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  .then(() => console.log("connextion reussi "))
  .catch((err) => console.log("connextion echoué " + err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(nodemailer.createTransport)

app.get("/", (req, res) =>
  res.render("register", {
    key: stripepublic,
  })
);

// on ajoute le préfix de chaque chemain url
app.use("/client", routesauth);
app.use("/responsable/gestion", routesres);
app.use(routesAuthUser);
app.use("/client/gestion", routescli);
app.use("/responsable/article", routesarticle);
app.use("/responsable/produit", routesproduit);
app.use("/responsable/categorie", routescategorie);
app.use("/achat/panier", routespanier);
app.use("/client/commentaire", routescommentaire);
app.use("/achat/commande", routecommande);
app.use("/gestion/livraison", routeslivraison);
app.use("/gestion/paiment", routespaiment);

routescategorie;


// on l'a exporter pour les utiliser ailleurs
module.exports = app;
