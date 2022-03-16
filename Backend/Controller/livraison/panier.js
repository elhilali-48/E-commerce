const Client = require("../../models/authentifiaction/Client");
const Article = require("../../models/product/Article");
const Panier = require("../../models/product/Panier");

module.exports.ajouterPanier = async (req, res) => {
  try {

          const article = await Client.findOne({_id: res.locals.client.id }) // recuperer les information du l'article

          for (let i = 0; i < article.articleselectionner.length; i++) { // je boucle les panier avec idclient connecté
           
            const a = article.articleselectionner[i] // je recupere les articles selectionner selon l'index
            const p = await Panier.findOne({_id: a }) // je prend le premier  id de panier et je le cherche dans panier
            //console.log(p.produitselectionner)
            const resultat = p.produitselectionner // je cherche le id du produit selectioner

            if( resultat  == req.params.id)
            {
              // je dois chercher le client puis le panier puis la quantité puis changer

              p.quantiteselectionne // et je la change je fait set donc j'utilise le id du panier puis je fait update et set pour changer la quantité
            }
          }
            const panier2 = await Panier.create
            ({
              produitselectionner:  req.params.id,
              quantiteselectionne : req.body.quantiteselectionne,
              idcli: res.locals.client.id 
            })
            await Client.updateOne(
              { _id: res.locals.client.id },
              { $push: { articleselectionner: panier2 } }
            );
          

  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};




module.exports.voirpanier = async (req, res) =>
{
  try 
  {
      const panier = await Panier.findOne
      (
        {_id: req.params.id},
        {...req.body}
      ).populate('produitselectionner')
      res.status(200).json(panier);
  }
  catch (err) 
  {
    res.status(400).json({ err: err.message });
  }
}