const express =require('express')
const commentaireCtrl = require("../../Controller/gestion_de_vente/commentaire");
const router  = express.Router();


router.post('/ajouter/:id', commentaireCtrl.ajouter)
router.get('/voircommentaire/:id', commentaireCtrl.voircommentaire)
router.put('/modifier/:id', commentaireCtrl.modifier)
router.delete('/supprimer/:id', commentaireCtrl.supprimer)


module.exports = router