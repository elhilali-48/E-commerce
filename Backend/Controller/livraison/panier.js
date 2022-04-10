const Client = require("../../models/authentifiaction/Client");
const Panier = require("../../models/product/Panier");
const Article = require("../../models/product/Article");
const Commande = require("../../models/livraison/Commande");

// ajouter les articles dans le panier
module.exports.ajouterPanier = async (req, res) => {
  console.log(req.body);
  try {
    const article = await Client.findOne({ _id: req.body.idcli }); // recuperer les information du l'article

    if (article.articleselectionner.length != 0) {
      for (let i = 0; i < article.articleselectionner.length; i++) {
        let element = article.articleselectionner[i];

        let chercheriddanspanier = await Panier.findOne({ _id: element._id });

        let trouveid = chercheriddanspanier.produitselectionner;

        if (trouveid == req.body.produitselectionner) {
          await Panier.findOneAndUpdate(
            { _id: chercheriddanspanier },
            { $inc: { quantiteselectionne: req.body.quantiteselectionne } }
          );
        } else {
          try {
            // créer un panier.
            const panier = await Panier.create({
              produitselectionner: req.body.produitselectionner,
              quantiteselectionne: req.body.quantiteselectionne,
              idcli: req.body.idcli,
            });
            await Client.updateOne(
              // on ajouter le panier dans les articles seleconner pour le client
              { _id: req.body.idcli },
              { $push: { articleselectionner: panier } }
            );
            res.status(200).json(panier).populate("produitselectionner");
          } catch (err) {
            res.status(400).json({ err: err.message });
          }
        }
      }
      res.status(201).json("l'article a bien été modifier");
    } else {
      const panier = await Panier.create({
        produitselectionner: req.body.produitselectionner,
        quantiteselectionne: req.body.quantiteselectionne,
        idcli: req.body.idcli,
      });
      await Client.updateOne(
        { _id: req.body.idcli },
        { $push: { articleselectionner: panier } }
      );

      res.status(200).json(panier);
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// cette fonction affiche un panier spécifique
module.exports.voirpanier = async (req, res) => {
  try {
    const panier = await Panier.findOne(
      { _id: req.params.id },
      { ...req.body }
    ).populate("produitselectionner");
    res.status(200).json(panier);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// modifier un panier dans la base donnée
module.exports.modifierPanier = async (req, res) => {
  try {
    const article = await Client.findOne({ _id: req.body.idcli }); // recuperer les information du l'article

    try {
      if (article.articleselectionner.length != 0) {
        for (let i = 0; i < article.articleselectionner.length; i++) {
          let element = article.articleselectionner[i];

          let chercheriddanspanier = await Panier.findOne({ _id: element._id });

          let trouveid = chercheriddanspanier.produitselectionner;

          if (trouveid == req.params.id) {
            await Panier.findOneAndUpdate(
              { _id: chercheriddanspanier },
              { quantiteselectionne: req.body.quantiteselectionne }
            );
          }
        }
        res.status(201).json("l'article a bien été modifier");
      }
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//  supprimer un panier dans la base de donnée
module.exports.supprimerPanier = async (req, res) => {
  try {
    const article = await Client.findOne({ _id: req.body.idcli }); // recuperer les information du l'article

    try {
      if (article.articleselectionner.length != 0) {
        for (let i = 0; i < article.articleselectionner.length; i++) {
          let element = article.articleselectionner[i];

          console.log(element);

          if (element == req.params.id) {
            await Panier.findByIdAndDelete({ _id: req.params.id }); // j'envoie le id du panier
            await Client.updateOne(
              { _id: req.body.idcli },
              { $pull: { articleselectionner: element } } // je stocke les articles selectionné
            );
          }
        }
        res.status(201).json("l'article a bien été supprimer");
      } else {
        res.status(201).json("io n'existe pas d'article a supprimer !");
      }
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// recupérer les articles et la quantité pour les afficher
module.exports.afficherProduit = async (req, res) => {
  try {
    const tab = [];
    const essaie = await Client.findOne({ _id: req.body.idCli });

    if (essaie.articleselectionner.length != 0) {
      for (let i = 0; i < essaie.articleselectionner.length; i++) {
        let element = essaie.articleselectionner[i];

        const a = await Panier.findOne({ _id: element._id });

        let b = a.produitselectionner;
        let quanttite = a.quantiteselectionne;

        const article = await Article.findOne({ _id: b });

        // on ajoute la quantité et l'article dans un tableau sous format d'objet
        tab.push({ article, quanttite, a });
      }
    }

    res.status(200).json(tab);
  } catch (err) {
    res.status(400).json(err);
  }
};
