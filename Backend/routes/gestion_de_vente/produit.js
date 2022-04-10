const express = require("express");
const produitCtrl = require("../../Controller/gestion_de_vente/produit");
const router = express.Router();

// c'est le route elle enregistre le chemin dans l'url spécifique a chaque fonction
router.post("/ajouter", produitCtrl.ajouterProduit);
router.put("/modifier/:id", produitCtrl.modifierproduit);
router.delete("/supprimer/:id", produitCtrl.supprimerProduit);
router.get("/voirProduit/:id", produitCtrl.voirProduit);
router.get("/voir", produitCtrl.voirall);

module.exports = router;
