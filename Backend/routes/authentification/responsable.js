const express = require('express');
const router = express.Router();

const responsabletCtrl = require('../../Controller/authentification/responsable');



router.put('/modifier/:id',  responsabletCtrl.updateResponsable);
router.delete('/supprimer/:id',  responsabletCtrl.deleteResponsable);
router.post('/ajouter',  responsabletCtrl.ajouterResponsable_post);
router.get('/information/:id', responsabletCtrl.afficherInformation);

module.exports = router