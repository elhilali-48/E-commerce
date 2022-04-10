const express = require("express");
const router = express.Router();

const userCtrl = require("../../Controller/authentification/user");

// c'est le route elle enregistre le chemin dans l'url spécifique a chaque fonction
router.get("/admin/login", userCtrl.login_get);
router.post("/admin/login", userCtrl.login_post);
router.get("/admin/logout", userCtrl.logout);

module.exports = router;
