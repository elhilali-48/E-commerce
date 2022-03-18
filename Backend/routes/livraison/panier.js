const express = require("express");
const panierCtrl = require("../../Controller/livraison/panier");
const router = express.Router();
const checkClient  = require("../../midlleware/authentifiaction");

router.post("/ajouter/:id", checkClient, panierCtrl.ajouterPanier);
router.get("/voirpanier/:id", checkClient, panierCtrl.voirpanier);

module.exports = router;
