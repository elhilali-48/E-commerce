const express =require('express')
const categorieCtrl = require("../../Controller/gestion_de_vente/categorie");
const router  = express.Router();


router.post('/ajouter', categorieCtrl.ajouterCategorie);




module.exports = router