const express =require('express')
const panierCtrl = require("../../Controller/livraison/panier");
const router  = express.Router();


router.post('/ajouter/:id', panierCtrl.ajouterPanier);

module.exports = router