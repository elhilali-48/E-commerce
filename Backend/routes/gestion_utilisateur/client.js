const express = require("express");

const router = express.Router();

const clientCtrl = require("../../Controller/gestion_utilisateur/client");

// c'est le route elle enregistre le chemin dans l'url spécifique a chaque fonction
router.get("/afficher/:id", clientCtrl.show_client);
router.post("/ajouter", clientCtrl.ajouterClient);
router.put("/modifier/:id", clientCtrl.modifierClient);
router.delete("/supprimer/:id", clientCtrl.supprimerClient);
router.get("/informationall", clientCtrl.informationall);
router.put("/modifieremail/:id", clientCtrl.modifieremail);
router.put("/modifiermdp/:id", clientCtrl.modifiermdp);
module.exports = router;
