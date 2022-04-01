const express = require("express");
const router = express.Router();
//  const checkClient  = require("../../midlleware/authentification");
 const paimentCtrl = require('../../Controller/livraison/paiment')
 const stripe = require ("stripe")(process.env.STRIPE_KEY_SECRET);


router.post("/paiment", paimentCtrl.ajouterpaiment);




module.exports = router;
