const Article = require("../../models/product/Article");
const Panier = require("../../models/product/Panier");

module.exports.ajouterPanier = async (req, res) => {
  try {
  
    var panierarticle = await Article.findByIdAndUpdate( { _id: req.params.id }, { $set: { quantiteselectionne: req.body.quantiteselectionne } })

    const panier = await Panier.findOne({ idcli: res.locals.client.id });


        if(panierarticle.quantiteselectionne <= panierarticle.quantite)
        {
          if (!panier) {
            const panier = await Panier.create({
              produitselectionner: req.params.id,
              idcli: res.locals.client.id ,
            });

            res.status(201).json(panier);
          } else {
            await Panier.updateOne(
              { idcli: res.locals.client.id },
              { $push: { produitselectionner: req.params.id } }
            );
            res.status(201).json(panier);
          }
        }
        else
        {
          res.status(400).json({ err: err.message });
        }

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