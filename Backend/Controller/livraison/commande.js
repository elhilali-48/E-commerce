const { findOne } = require("../../models/authentifiaction/Client");
const Client = require("../../models/authentifiaction/Client");
const Commande = require("../../models/livraison/Commande");
const Article = require("../../models/product/Article");
const Panier = require("../../models/product/Panier");

//  ajouter une commande d'un client

module.exports.ajouterCommande = async (req, res, next) => {
  try {
    const commande = await Commande.create({
      idcli: req.body.idcli,
      totale: req.body.totale,
    });
    await Client.updateOne(
      { _id: req.body.idcli }, // on a utilisé la commmande push pour stocker tous les commandes d'un client dans la table client
      { $push: { commande: commande } }
    );

    res.status(201).json(commande);
  } catch (err) {
    res.status(400).json(err.message);
  }

  next();
};

//inserer article
module.exports.inserer = async (req, res) => {
  try {
    const essaie = await Client.findOne({ _id: req.body.idcli });

    for (let i = 0; i < essaie.articleselectionner.length; i++) {
      let element = essaie.articleselectionner[i];

      const a = await Panier.findOne({ _id: element._id });

      let b = a.produitselectionner;
      let quanttite = a.quantiteselectionne;
      const article = await Article.findOne({ _id: b });
      let c = essaie.commande[essaie.commande.length - 1];
      const commande = await Commande.updateOne(
        { _id: c },
        { $push: { articles: { quanttite, article } } }
      );
      res.status(201).json(commande);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// aprés que la commande se termine cette fonction permet de mettre a jour le stock
module.exports.commandeterminer = async (req, res) => {
  try {
    const essaie = await Client.findOne({ _id: req.body.idcli });

    const recuperer_dernier_element =
      essaie.commande[essaie.commande.length - 1];

    const commande_table = await Commande.findOne({
      _id: recuperer_dernier_element,
    });

    if (commande_table.statut == true) {
      for (let i = 0; i < commande_table.articles.length; i++) {
        let resultat =
          commande_table.articles[i].article.quantite -
          commande_table.articles[i].quanttite;
        console.log(resultat);

        await Article.updateOne(
          { _id: commande_table.articles[i].article._id },
          { $set: { quantite: resultat } }
        );
        await Client.updateOne(
          { _id: res.locals.client.id },
          { $pull: { articleselectionner: essaie.articleselectionner[i] } }
        );
      }

      res.status(201).json("ay");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//  récupèrer tous les information du commande. on a utilisé populate pour afficher tous les articles
module.exports.commandeall = async (req, res) => {
  try {
    const commande = await Commande.find({ ...req.body }).populate("articles");

    res.status(200).json(commande);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//modifier le statut de paiment si le paiment d'une commande s'est bien éfectuer ou non
module.exports.statut = async (req, res) => {
  try {
    await Commande.updateOne(
      { _id: req.params.id },
      { $set: { statut: req.body.statut } }
    );

    res.status(201).json("statur modifier");
  } catch (err) {}
};
