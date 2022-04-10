const Produit = require("../../models/product/Produit");
const Categorie = require("../../models/product/Categorie");

// cette fonction ajoute une catégorie dans la base de donnée
module.exports.ajouterCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.create({
      nom: req.body.nom,
      categorie: req.body.categorie,
    });
    res.status(201).json({ message: "la categorie a bien été creée" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// elle permet d'afficher tous les categorie en affichant les information du produit à l'aide du populate
module.exports.voirall = async (req, res) => {
  try {
    const categorie = await Categorie.find().populate("produit");
    res.status(200).json(categorie);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// cette fonction modifie la catégorie
module.exports.modifierCategorie = async (req, res) => {
  try {
    await Categorie.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { nom: req.body.nom } }
    );
    res.status(201).json({ message: "Categorie a bien été modifié" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
// cette fonction supprimer une catégorie
module.exports.supprimerCategorie = async (req, res) => {
  try {
    await Produit.deleteMany({ categorie: req.params.id });

    await Categorie.findOneAndRemove({ _id: req.params.id });
    res.status(201).json("la Categorie a bien été supprimer");
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// elle affiche une catégorie spécifique
module.exports.voirCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.find(
      { _id: req.params.id },
      { ...req.body }
    ).populate("produit");
    res.status(200).json(categorie);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
