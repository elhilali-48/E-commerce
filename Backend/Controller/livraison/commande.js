const Client = require("../../models/authentifiaction/Client");
const Commande = require("../../models/livraison/Commande");


module.exports.ajouterCommande = async (req, res) => 
{

    try {

        const commande = await Commande.create({

            idcli : res.locals.client.id,
            articles: 
            [
                  req.body.articles
            ],
            livraison: req.body.livraison,
            totale: req.body.totale
        })
        res.status(201).json(commande)    
        
    } catch (err) 
    {
        res.status(400).json(err)    
    }

};

module.exports.afficherCommande = async (req, res) =>
{
    try 
    {
        const commande = await Commande.findOne({...req.body}).populate('idcli')

        res.status(201).json(commande)
        
    } catch (err) 
    {
        res.status(400).json(err)     
    }
}


