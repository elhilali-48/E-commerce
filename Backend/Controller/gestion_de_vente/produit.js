const Produit = require('../../models/product/Produit')
const Categorie = require('../../models/product/Categorie');
const Article = require('../../models/product/Article');



module.exports.ajouterProduit = async (req, res) =>
{
    try
    {  
        const produit = await Produit.create
        ({

            nom: req.body.nom,
            categorie: req.body.categorie

        }) 
        await Categorie.updateOne
        (
            { _id: req.body.categorie }, { $push: { produit: produit }}
        )      
        res.status(201).json({ produit, message: "le produit a bien été creée"})
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
        ().populate('article')
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
            { $set: { nom: req.body.nom }}
        )
        res.status(201).json({message: "produit a bien été modifié"})
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
        await Article.deleteMany({ produit: req.params.id })

        await Produit.findOneAndRemove
        (
            {_id: req.params.id}
        )   
        res.status(201).json('le produit a bien été supprimer')
    }
    catch (err) 
    {
        res.status(400).json({err: err.message})
    }
}

module.exports.voirProduit = async (req, res) =>
{
    try 
    {
        const data = await Produit.find
        (
            {_id: req.params.id},
            { ...req.body }
        ).populate('article')
        res.status(200).json(data)
    } 
    catch (err) 
    {
        res.status(400).json( err.message)
    }
}