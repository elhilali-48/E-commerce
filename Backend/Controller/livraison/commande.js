const { findOne } = require("../../models/authentifiaction/Client");
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
    await Client.updateOne(
      { _id: res.locals.client.id },
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
    const essaie = await Client.findOne({ _id: res.locals.client.id });

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


// diminuer article
module.exports.commandeterminer = async (req, res) => {
  try {
    const essaie = await Client.findOne({ _id: res.locals.client.id });

    const recuperer_dernier_element =
      essaie.commande[essaie.commande.length - 1];

    const commande_table = await Commande.findOne({
      _id: recuperer_dernier_element,
    });

    if(commande_table.statut == true)
    {
      for (let i = 0; i < commande_table.articles.length; i++) {
        // console.log(commande_table.articles[i].article.quantite); // quantite de artcile
        // console.log(commande_table.articles[i].article.quantite); // quantite de article dans la commande
        let resultat =
          commande_table.articles[i].article.quantite -
          commande_table.articles[i].quanttite;
        console.log(resultat);
  
        await Article.updateOne(
          { _id: commande_table.articles[i].article._id },
          { $set: { quantite: resultat } }
        );
        await Client.updateOne({_id: res.locals.client.id}, { $pull: { articleselectionner: essaie.articleselectionner[i] } })
      }

  
      res.status(201).json("ay");
    }

  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.commandeall = async (req, res) =>
{
  try 
  {
    const commande = await Commande.find({...req.body}).populate("articles")
    
    res.status(200).json(commande);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

module.exports.statut = async( req, res) =>
{
  try {

    await Commande.updateOne({_id: req.params.id}, {$set: {statut: req.body.statut}})

    res.status(201).json("statur modifier")
    
  } catch (err) {
    
  }
}