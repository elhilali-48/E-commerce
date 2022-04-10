const express = require("express");
const categorieCtrl = require("../../Controller/gestion_de_vente/categorie");
const router = express.Router();

// c'est le route elle enregistre le chemin dans l'url spécifique a chaque fonction
router.post("/ajouter", categorieCtrl.ajouterCategorie);
router.put("/modifier/:id", categorieCtrl.modifierCategorie);
router.delete("/supprimer/:id", categorieCtrl.supprimerCategorie);
router.get("/voirCategorie/:id", categorieCtrl.voirCategorie);
router.get("/voir", categorieCtrl.voirall);

module.exports = router;
