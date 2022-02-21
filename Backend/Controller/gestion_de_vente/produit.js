const Produit = require('../../models/product/Produit')
const Article = require('../../models/product/Article');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.ajouterProduit = async (req, res) =>
{
    try
    {  
        await Produit.create
        ({
            nom: req.body.nom,
            categorie: req.body.categorie
        })      
        res.status(201).json({ message: "ok"})
    }
    catch(err)
    {
        res.status(400).json({ err: err.message })
    }    
}

module.exports.afficher_information = async (req, res) =>
{
    try
    {
        const produit =await Produit.findOne({_id: req.params.id})

        res.status(201).json({ produit })
    }
    catch(err)
    {
        res.status(400).json({ err })
    }
}

module.exports.insertProduit = async (req, res) =>
{
    try
    {  
        await Produit.updateMany
        ( {},{ $push:{ articles: req.body.articles } })      
        res.status(201).json({ message: "ok"})
    }
    catch(err)
    {
        res.status(400).json({ err: err.message })
    }    
}

module.exports.deleteProduit = async (req, res, next) =>
{   
    try
    {

        await Article.findOneAndRemove(req.body.articles)
        await Produit.findByIdAndRemove(req.params.id)
           
        res.status(201).json({ message: 'ok' })
    }
    catch(err)
    {
        res.status(400).json({ err: err.message })
    }
        
}