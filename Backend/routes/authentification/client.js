const express = require('express');
const router = express.Router();

const clientCtrl = require('../../Controller/authentification/client');



router.get('/register',  clientCtrl.register_get);
router.post('/register',  clientCtrl.register_post);
router.get('/login',  clientCtrl.login_get);
router.post('/login',  clientCtrl.login_post);
router.get('/logout', clientCtrl.logout)



module.exports = router