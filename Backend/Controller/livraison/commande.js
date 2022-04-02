const Client = require("../../models/authentifiaction/Client");
const Commande = require("../../models/livraison/Commande");
const Article = require("../../models/product/Article");
const Panier = require("../../models/product/Panier");

module.exports.ajouterCommande = async (req, res, next) => {
  try {
    const commande = await Commande.create({
      idcli: res.locals.client.id,
      totale: req.body.totale,
    });

    res.status(201).json(commande);
  } catch (err) {
    res.status(400).json(err.message);
  }

  next();
};

module.exports.inserer = async (req, res) => {
  try {
    const essaie = await Client.findOne({ _id: res.locals.client.id });

    for (let i = 0; i < essaie.articleselectionner.length; i++) {
      let element = essaie.articleselectionner[i];

      const a = await Panier.findOne({ _id: element._id });

      let b = a.produitselectionner;
      let quanttite = a.quantiteselectionne;

      const article = await Article.findOne({ _id: b });

      const commande = await Commande.updateOne(
        { idcli: res.locals.client.id },
        { $push: { articles: { quanttite, article } } }
      );

      res.status(201).json(commande);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};
