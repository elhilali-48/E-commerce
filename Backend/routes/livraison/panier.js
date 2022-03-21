const express = require("express");
const panierCtrl = require("../../Controller/livraison/panier");
const router = express.Router();
const checkClient  = require("../../midlleware/authentification");

router.post("/ajouter", checkClient, panierCtrl.ajouterPanier);
router.get("/voirpanier/:id", checkClient, panierCtrl.voirpanier);
router.put("/modifier/:id", checkClient, panierCtrl.modifierPanier);
router.delete("/supprimer/:id", checkClient, panierCtrl.supprimerPanier)
router.get("/voirarticle", checkClient, panierCtrl.afficherProduit)



module.exports = router;
