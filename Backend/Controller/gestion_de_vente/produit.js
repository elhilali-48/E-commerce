const Produit = require('../../models/product/Produit')
const Article = require('../../models/product/Article');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.ajouterProduit = async (req, res) =>
{
    try
    {  
        const data = await Produit.create
        ({

            nom: req.body.nom,
            categorie: req.body.categorie

        })      
        res.status(201).json({ data, message: "l\'article a bien été creée"})
    }
    catch(err)
    {
        res.status(400).json({ err: err.message })
    }    
}

module.exports.voirProduit = async (req, res) =>
{
    try 
    {

        for (let i = 0; i <= Article.length; i++) {
            const element = array[i];
            
        }
        const data = await Produit.findOne
        (
            {_id: req.params.id},
            {...req.body}
        )
        res.status(200).json(data)
    } 
    catch (err) 
    {
        res.status(400).json(err)
    }
}