const express = require("express");
const router = express.Router();
 const checkClient  = require("../../midlleware/authentification");
 const paimentCtrl = require('../../Controller/livraison/paiment')


router.post("/paiment", checkClient, paimentCtrl.ajouterpaiment);




module.exports = router;
