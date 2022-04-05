const express = require("express");
const commandeCtrl = require("../../Controller/livraison/commande");
const router = express.Router();
const checkClient = require("../../midlleware/authentification");

router.post("/ajouter", checkClient, commandeCtrl.ajouterCommande);
router.post("/ajouterd", checkClient, commandeCtrl.inserer);
router.post("/dernier", checkClient, commandeCtrl.commandeterminer);
router.get("/voirall", checkClient, commandeCtrl.commandeall);
router.put("/modifierStatus", checkClient, commandeCtrl.statut);





module.exports = router;
