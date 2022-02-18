const express =require('express')

const router  = express.Router();

const clientCtrl = require("../../Controller/gestion_utilisateur/client");



router.get('/afficher/:id', clientCtrl.show_client);
router.post('/ajouter', clientCtrl.ajouterClient);
router.put('/modifier/:id', clientCtrl.modifierClient);
router.delete('/supprimer/:id',clientCtrl.supprimerClient);

module.exports = router