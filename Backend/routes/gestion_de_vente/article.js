const express = require("express");
const articleCtrl = require("../../Controller/gestion_de_vente/article");
const router = express.Router();
const multer = require("multer");

const storage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      //supprimer les espaces
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, fileName);
    },
    limits: {
      fileSize: 900000,
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      console.log("Error");
    }
  },
});
router.post('/ajouter',storage.single('file'), articleCtrl.ajouterArticle);
router.put('/modifier/:id',storage.single('file'), articleCtrl.modifierArticle);
router.delete('/supprimer/:id', articleCtrl.supprimerArticle);
router.get('/voirarticle/:id', articleCtrl.voirArticle);
router.get('/voir', articleCtrl.voirall);


module.exports = router
