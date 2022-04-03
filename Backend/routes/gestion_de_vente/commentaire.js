const express = require("express");
const commentaireCtrl = require("../../Controller/gestion_de_vente/commentaire");
const checkClient = require("../../midlleware/authentification");
const router = express.Router();

router.post("/ajouter/:id", checkClient, commentaireCtrl.ajouter);
router.get("/voircommentaire/:id", commentaireCtrl.voircommentaire);
router.put("/modifier/:id", commentaireCtrl.modifier);
router.delete("/supprimer/:id", commentaireCtrl.supprimer);
router.get("/voiravis/:id", commentaireCtrl.voiravis);

module.exports = router;
