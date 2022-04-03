const express = require("express");
const router = express.Router();

const userCtrl = require("../../Controller/authentification/user");

router.get("/admin/login", userCtrl.login_get);
router.post("/admin/login", userCtrl.login_post);
router.get("/admin/logout", userCtrl.logout);

module.exports = router;
