const { updateOne } = require('../../models/product/Panier');
const Panier = require('../../models/product/Panier')
const jwt = require('jsonwebtoken');
const Client = require('../../models/authentifiaction/Client');


module.exports.ajouterPanier = async (req, res) =>
{
    const cli = req.coockies
    console.log(cli);
 
   try
    {  


            const panier=  await Panier.create(
                {
                    produitselectionner: req.params.id,
                    idcli: cli
                }
            )
            

            await Panier.updateOne(
                
                    { _id: req.client._id }, { $push: { idclient: panier }}
                
            )
            
            res.status(201).json({message: "panier bien créer"})

    }
    catch(err)
    {
        res.status(400).json({ err: err.message })
    } 
}