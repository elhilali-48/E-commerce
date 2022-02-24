const express =require('express')
const produitCtrl = require("../../Controller/gestion_de_vente/produit");
const router  = express.Router();


router.post('/ajouter', produitCtrl.ajouterProduit);
router.get('/voirproduit/:id', produitCtrl.voirProduit);





module.exports = router