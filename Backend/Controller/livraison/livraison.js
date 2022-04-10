const Livraison = require("../../models/livraison/Livraison");

// elle ajoute un nouveau mode de livraison
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

// afficher un mode de livraison spécifique
module.exports.showLivraison = async (req, res) => {
  try {
    const livraison = await Livraison.findOne({ _id: req.params.id });
    res.status(200).json(livraison);
  } catch (error) {
    res.status(400).json(error);
  }
};

// afficher tous les modes de livraisons
module.exports.showLivraisonAll = async (req, res) => {
  try {
    const livraison = await Livraison.find({ ...req.body });
    res.status(200).json(livraison);
  } catch (error) {}
};

// modifier un mode de livraison
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

// suprimmer un mode de livraison
module.exports.supprimerLivraison = async (req, res) => {
  try {
    const data = await Livraison.findByIdAndRemove({ _id: req.params.id });
    res.status(201).json("Article Supprimé");
  } catch (err) {
    res.status(400).json(err);
  }
};
