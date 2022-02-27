const express =require('express')
const articleCtrl = require("../../Controller/gestion_de_vente/article");
const router  = express.Router();


router.post('/ajouter', articleCtrl.ajouterArticle);
router.put('/modifier/:id', articleCtrl.modifierArticle);
router.delete('/supprimer/:id', articleCtrl.supprimerArticle);
router.get('/voirarticle/:id', articleCtrl.voirArticle);
router.get('/voir', articleCtrl.voirall);
router.patch('/inserer/:id', articleCtrl.insererArticle);


module.exports = router