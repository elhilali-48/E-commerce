const express = require("express");
const commandeCtrl = require("../../Controller/livraison/commande");
const router = express.Router();
const checkClient = require("../../midlleware/authentification");

router.post("/ajouter", checkClient, commandeCtrl.ajouterCommande);
router.post("/ajouterd", checkClient, commandeCtrl.inserer);

module.exports = router;
