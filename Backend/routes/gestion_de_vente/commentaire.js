const express =require('express')
const commentaireCtrl = require("../../Controller/gestion_de_vente/commentaire");
const router  = express.Router();


router.post('/ajouter/:id', commentaireCtrl.ajouter)


module.exports = router