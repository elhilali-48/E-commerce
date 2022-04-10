const Produit = require("../../models/product/Produit");
const Categorie = require("../../models/product/Categorie");
const Article = require("../../models/product/Article");

// cette fonction permet de creer un produit dans la base de donnée
module.exports.ajouterProduit = async (req, res) => {
  try {
    const produit = await Produit.create({
      nom: req.body.nom,
      categorie: req.body.categorie,
    });
    await Categorie.updateOne(
      // on a fait push dans une attribut dans la table categorie pour afficher tous les produits de chaque categorie
      { _id: req.body.categorie },
      { $push: { produit: produit } }
    );
    res.status(201).json({ produit, message: "le produit a bien été creée" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// afficher tous les produits dans la base de donnée
module.exports.voirall = async (req, res) => {
  try {
    const data = await Produit.find().populate("article").populate("categorie"); // on a utilisé populate pour aficher les information et non seulement les id
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err });
  }
};

//  modifier un produits spécifique demandé par le client
module.exports.modifierproduit = async (req, res) => {
  try {
    const data = await Produit.findOneAndUpdate(
      { _id: req.params.id },
      // { $set: { nom: req.body.nom }}
      { ...req.body }
    );
    res.status(201).json({ message: "produit a bien été modifié" });
  } catch (err) {
    res.status(400).json(err);
  }
};
// supprime un produit spécifique demandé par le client
module.exports.supprimerProduit = async (req, res) => {
  try {
    await Article.deleteMany({ produit: req.params.id });

    await Produit.findOneAndRemove({ _id: req.params.id });
    res.status(201).json("le produit a bien été supprimer");
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// affichee un produit spécifique demandé par le client
module.exports.voirProduit = async (req, res) => {
  try {
    const data = await Produit.find({ _id: req.params.id }, { ...req.body })
      .populate("article")
      .populate("categorie");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
