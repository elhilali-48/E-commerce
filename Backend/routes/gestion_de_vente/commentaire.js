const express =require('express')
const commentaireCtrl = require("../../Controller/gestion_de_vente/commentaire");
const router  = express.Router();
const { requireClient, checkClient, } = require("../../midlleware/authentifiaction");


router.patch('/ajouter/:id', checkClient,commentaireCtrl.ajouter)


module.exports = router