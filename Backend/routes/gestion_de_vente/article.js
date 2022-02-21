const express =require('express')
const articleCtrl = require("../../Controller/gestion_de_vente/article");
const router  = express.Router();


router.post('/ajouter', articleCtrl.ajouterArticle);

module.exports = router