
const Client = require("../../models/authentifiaction/Client");
const Article = require("../../models/product/Article");
const Panier = require("../../models/product/Panier");

module.exports.ajouterPanier = async (req, res) => {
  try {
    const article = await Client.findOne({ _id: res.locals.client.id }); // recuperer les information du l'article

    if(article.articleselectionner.length != 0 )
    {
      for (let i = 0; i < article.articleselectionner.length; i++) 
      {
        let element = article.articleselectionner[i];

       let chercheriddanspanier = await Panier.findOne({_id: element._id})
        
        let trouveid = chercheriddanspanier.produitselectionner



        if(trouveid == req.params.id)
        {

           let essaie = await Panier.findOneAndUpdate({_id: chercheriddanspanier}, { $inc: { quantiteselectionne: 1 } })  
          console.log(essaie);
        }
      }
      res.status(201).json("l'article a bien été modifier");
      
    }
    else
    {
      const panier = await Panier.create({
        produitselectionner: req.params.id,
        quantiteselectionne: req.body.quantiteselectionne,
        idcli: res.locals.client.id,
      });
      await Client.updateOne(
        { _id: res.locals.client.id },
        { $push: { articleselectionner: panier } }
      );
  
      res.status(200).json(panier);
    }

    
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

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

module.exports.modifierPanier = async (req, res) => {
  try {
    const article = await Client.findOne({ _id: res.locals.client.id }); // recuperer les information du l'article

    try 
    {
      if(article.articleselectionner.length != 0 )
      {
        for (let i = 0; i < article.articleselectionner.length; i++) 
        {
          let element = article.articleselectionner[i];
  
         let chercheriddanspanier = await Panier.findOne({_id: element._id})
          
          let trouveid = chercheriddanspanier.produitselectionner
  
          if(trouveid == req.params.id)
          {
            await Panier.findOneAndUpdate({_id: chercheriddanspanier}, { quantiteselectionne: req.body.quantiteselectionne }) 
          }
        }
        res.status(201).json("l'article a bien été modifier");  
      }
      
    } catch (err) 
    {

      res.status(400).json({ err: err.message });
      
    }

  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

