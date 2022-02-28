const { updateOne } = require('../../models/product/Panier');
const Panier = require('../../models/product/Panier')


module.exports.ajouterPanier = async (req, res) =>
{
    
 
   try
    {  

            const panier=  await Panier.create(
                {
                    _id: req.params.client,
                    produitselectionner: req.params.id,
                }.populate('produitselectionner')
            ) 
            res.status(201).json({panier})

    }
    catch(err)
    {
        res.status(400).json({ err: err.message })
    }    
}