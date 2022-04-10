const express = require("express");
const router = express.Router();

const responsabletCtrl = require("../../Controller/gestion_utilisateur/responsable");
const checkClient = require("../../midlleware/authentification");

// c'est le route elle enregistre le chemin dans l'url spécifique a chaque fonction
router.put("/modifier/:id", responsabletCtrl.updateResponsable);
router.delete("/supprimer/:id", responsabletCtrl.deleteResponsable);
router.post("/ajouter", checkClient,responsabletCtrl.ajouterResponsable_post);
router.get("/information/:id", responsabletCtrl.afficherInformation);
router.get("/informationall", responsabletCtrl.afficherInformationall);
router.put("/modifiermdp/:id", responsabletCtrl.modifiermdp);
module.exports = router;
