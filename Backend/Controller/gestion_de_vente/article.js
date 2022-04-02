const Article = require("../../models/product/Article");
const Panier = require("../../models/product/Panier");
const Produit = require("../../models/product/Produit");

module.exports.ajouterArticle = async (req, res) => {
  // console.log(req.body)
  // console.log(req.file)

  try {
    const article = await Article.create({
      nom: req.body.nom,
      quantite: req.body.quantite,
      description: req.body.description,
      prix: req.body.prix,
      avis: req.body.avis,
      produit: req.body.produit,
      image: req.file.filename,
      description_technique: {
        ram: req.body.ram,
        stockage: req.body.stockage,
        processeur: req.body.processeur,
        pouces: req.body.pouces,
      },
    });
    await Produit.updateOne(
      { _id: req.body.produit },
      { $push: { article: article } }
    ).populate("article");
    res.status(201).json({ message: "l'article a bien été creée" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports.voirall = async (req, res) => {
  try {
    const data = await Article.find().populate("produit");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err });
  }
};

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

module.exports.supprimerArticle = async (req, res) => {
  try {
    await Article.findOneAndRemove({ _id: req.params.id });
    res.status(201).json("l'article a bien été supprimer");
  } catch (err) {
    res.status(400).json(err, err.message);
  }
};

module.exports.voirArticle = async (req, res) => {
  try {
    const data = await Article.findOne({ _id: req.params.id })
      .populate("produit")
      .populate("personnecomment");
    //ajouter populate("livraison")
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
