const express = require("express");
const router = express.Router();

const clientCtrl = require("../../Controller/authentification/client");
const checkClient = require("../../midlleware/authentification");

router.get("/register", checkClient, clientCtrl.register_get);
router.post("/register", checkClient, clientCtrl.register_post);
router.get("/login", checkClient, clientCtrl.login_get);
router.post("/login", checkClient, clientCtrl.login_post);
router.get("/logout", clientCtrl.logout);
router.post("/valider", clientCtrl.validerCompte);
router.put("/modifiermdp/:id", clientCtrl.modifiermdp);
router.post("/chercher", clientCtrl.chercherclient);

module.exports = router;
