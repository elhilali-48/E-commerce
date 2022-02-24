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

module.exports.voirall = async (req, res) =>
{
    try {

        const data = await Produit.find
        (

        )
        res.status(200).json(data)
        
    } 
    catch (err) 
    {
       res.status(400).json({err}) 
    }
}

module.exports.modifierproduit = async (req, res) =>
{
    try 
    {
        const data = await Produit.findOneAndUpdate
        (
            {_id: req.params.id},
            { ...req.body}
        )
        res.status(201).json(data)
    } 
    catch (err) 
    {
        res.status(400).json(err)
    }
}

module.exports.supprimerProduit = async (req, res) =>
{
    try 
    {
        await Produit.findOneAndRemove
        (
            {_id: req.params.id}
        )   
        res.status(201).json('l\'article a bien été supprimer')
    } 
    catch (err) 
    {
        res.status(400).json(err, err.message)
    }
}

module.exports.voirProduit = async (req, res) =>
{
    try 
    {
        const data = await Produit.find
        (
            {_id: req.params.id},
        )
        res.status(200).json(data)
    } 
    catch (err) 
    {
        res.status(400).json(err)
    }
}