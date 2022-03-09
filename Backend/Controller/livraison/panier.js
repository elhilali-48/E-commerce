const Panier = require('../../models/product/Panier')

 

module.exports.ajouterPanier = async (req, res, next) =>
{


   try
    {  
            const panier=  await Panier.create(
                {
                    produitselectionner: req.params.id,
                    idcli: req.client._id
                }
            )
            
            res.status(201).json({panier})
    }
    catch(err)
    {
        res.status(400).json({ err: err.message })
    } 
}