const express =require('express')
const commentaireCtrl = require("../../Controller/gestion_de_vente/commentaire");
const router  = express.Router();
const checkClient = require("../../midlleware/authentifiaction");


router.post('/ajouter/:id', checkClient,commentaireCtrl.ajouter)
router.get('/voircommentaire/:id', checkClient, commentaireCtrl.voircommentaire)
router.put('/modifier/:id', checkClient, commentaireCtrl.modifier)
router.delete('/supprimer/:id', checkClient, commentaireCtrl.supprimer)


module.exports = router