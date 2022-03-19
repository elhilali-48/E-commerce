const express = require("express");
const panierCtrl = require("../../Controller/livraison/panier");
const router = express.Router();
const checkClient  = require("../../midlleware/authentification");

router.post("/ajouter/:id", checkClient, panierCtrl.ajouterPanier);
router.get("/voirpanier/:id", checkClient, panierCtrl.voirpanier);
router.put("/modifierpanier/:id", checkClient, panierCtrl.modifierPanier);



module.exports = router;
