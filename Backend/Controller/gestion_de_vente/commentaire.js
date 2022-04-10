const bodyParser = require("body-parser");
const Commentaire = require("../../models/product/Commentaire");
const Article = require("../../models/product/Article");

// ajouter un commentaire
module.exports.ajouter = async (req, res) => {
  try {
    const comment = await Commentaire.create({
      commentaire: req.body.commentaire,
      avie: req.body.avie,
      idclient: req.body.idcli,
    });
    // a chaque fois on ajoute un commentaire on utilise la commande push pour l'ajouter dnas la liste des commentaire de l'article
    await Article.updateOne(
      { _id: req.params.id },
      { $push: { personnecomment: comment } }
    );
    // a chaque fois on ajoute un avis on utilise la commande push pour l'ajouter dnas la liste des avis de l'article pour calculer la moyenne
    await Article.updateOne(
      { _id: req.params.id },
      { $push: { personneavis: req.body.avie } }
    );

    res.status(201).json({ comment });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// récupérer les information d'un commentaire
module.exports.voircommentaire = async (req, res) => {
  try {
    const comment = await Commentaire.findOne(
      { _id: req.params.id },
      { ...req.body }
    );

    res.status(200).json({ comment });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// modifier un commentaire spécifique
module.exports.modifier = async (req, res) => {
  try {
    const comment = await Commentaire.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { commentaire: req.body.commentaire } }
    );
    res.status(201).json({ comment });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
// elle supprime un commentair spécifique
module.exports.supprimer = async (req, res) => {
  try {
    await Commentaire.findByIdAndRemove({ _id: req.params.id });
    res.status(201).json({ comment: "ce commentaire a bien été supprimer" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// cette fonction calculela moyenne des avis de l'article
module.exports.voiravis = async (req, res) => {
  try {
    let sum = 0;
    var result= 0;
    const avis = await Article.findOne({ _id: req.params.id });

    for (let i = 0; i < avis.personneavis.length; i++) {
      sum = sum + parseInt(avis.personneavis[i]);
    }
    result = sum / avis.personneavis.length;
    
    var nbp = avis.personneavis.length;

    res.status(200).json({ result, nbp });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
