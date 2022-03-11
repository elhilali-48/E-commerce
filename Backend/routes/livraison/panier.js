const express =require('express')
const panierCtrl = require("../../Controller/livraison/panier");
const router  = express.Router();
const {  requireClient, checkClient } = require('../../midlleware/authentifiaction')


router.post('/ajouter/:id', checkClient, panierCtrl.ajouterPanier);

module.exports = router