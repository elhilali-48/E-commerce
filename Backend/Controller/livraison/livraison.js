const Livraison = require("../../models/livraison/Livraison");
// const Article = require("../../models/product/Article")
// BackOffice
module.exports.ajouterLivraison = async (req, res) => {
  try {
    const livraison = await Livraison.create({
      company: req.body.company,
      type: req.body.type,
      duree: req.body.duree,
      prix: req.body.prix,
    });
    res.status(201).json(livraison);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.showLivraison = async (req, res) => {
  try {
    const livraison = await Livraison.findOne({ _id: req.params.id });
    res.status(200).json(livraison);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.showLivraisonAll = async (req, res) => {
  try {
    const livraison = await Livraison.find({ ...req.body });
    res.status(200).json(livraison);
  } catch (error) {}
};

module.exports.modifierLivraison = async (req, res) => {
  try {
    const data = await Livraison.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );
    res.status(201).json("Article Modifié");
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.supprimerLivraison = async (req, res) => {
  try {
    const data = await Livraison.findByIdAndRemove({ _id: req.params.id });
    res.status(201).json("Article Supprimé");
  } catch (err) {
    res.status(400).json(err);
  }
};
