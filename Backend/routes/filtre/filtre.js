const express = require('express')
const router  = express.Router();

const filtreCtrl = require('../../Controller/filtre/filtre')

router.post('/filtre/login', filtreCtrl.login_post)

module.exports = router


