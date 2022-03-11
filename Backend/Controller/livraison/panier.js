const Panier = require("../../models/product/Panier");

module.exports.ajouterPanier = async (req, res) => {
  try {
    const panier = await Panier.findOne({ idcli: res.locals.client.id });
    var cli = res.locals.client.id
    if (!panier) {
      const panier = await Panier.create({
        produitselectionner: req.params.id,
        idcli: cli ,
      });

      res.status(201).json(panier);
    } else {
      await Panier.updateOne(
        { idcli: res.locals.client.id },
        { $push: { produitselectionner: req.params.id } }
      );
      res.status(201).json(panier);
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};