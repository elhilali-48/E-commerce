const express =require('express')
const produitCtrl = require("../../Controller/gestion_de_vente/produit");
const router  = express.Router();


router.post('/ajouter', produitCtrl.ajouterProduit);
router.get('/information/:id', produitCtrl.afficher_information);
router.post('/inserer/:id', produitCtrl.insertProduit);
router.delete('/supprimer/:id', produitCtrl.deleteProduit);



module.exports = router