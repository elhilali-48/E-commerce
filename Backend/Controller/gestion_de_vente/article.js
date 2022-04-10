const Article = require("../../models/product/Article");
const Panier = require("../../models/product/Panier");
const Produit = require("../../models/product/Produit");

//  creer un article dans la base de donnée
module.exports.ajouterArticle = async (req, res) => {
  try {
    const article = await Article.create({
      nom: req.body.nom,
      quantite: req.body.quantite,
      description: req.body.description,
      prix: req.body.prix,
      avis: req.body.avis,
      produit: req.body.produit,
      image: req.file.filename,
      ram: req.body.ram,
      stockage: req.body.stockage,
      pouces: req.body.pouces,
      processeur: req.body.processeur,
      promotion: req.body.promotion,
    });
    await Produit.updateOne(
      { _id: req.body.produit },
      { $push: { article: article } } // on a fait push dans une attribut dans la table produit pour afficher tous les articles de chaque produit
    ).populate("article");
    res.status(200).json("Article crééer");
  } catch (err) {
    res.status(400).json(err);
  }
};

// afficher tous les article dans la base de donnée
module.exports.voirall = async (req, res) => {
  try {
    const data = await Article.find().populate("produit"); // on a utilisé populate pour aficher les information et non seulement les id
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err });
  }
};

// modifier un article spécifique demandé par le client
module.exports.modifierArticle = async (req, res) => {
  try {
    const data = await Article.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};
// supprimer un article spécifique demandé par le client
module.exports.supprimerArticle = async (req, res) => {
  try {
    await Article.findOneAndRemove({ _id: req.params.id });
    res.status(201).json("l'article a bien été supprimer");
  } catch (err) {
    res.status(400).json(err, err.message);
  }
};

// afficher un article spécifique demandé par le client
module.exports.voirArticle = async (req, res) => {
  try {
    const data = await Article.findOne({ _id: req.params.id })
      .populate("produit")
      .populate("personnecomment");

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
