const Article = require('../../models/product/Article')


module.exports.ajouterArticle = async (req, res) =>
{
    try
    {  
        await Article.create
        ({

            nom: req.body.nom,
            quantite: req.body.quantite,
            description: req.body.description,
            prix: req.body.prix,
            avis: req.body.avis,
            produit: req.body.produit

        })      
        res.status(201).json({ message: "l\'article a bien été creée"})
    }
    catch(err)
    {
        res.status(400).json({ err: err.message })
    }    
}

module.exports.voirall = async (req, res) =>
{
    try {

        const data = await Article.find
        (

        )
        res.status(200).json(data)
        
    } 
    catch (err) 
    {
       res.status(400).json({err}) 
    }
}

module.exports.modifierArticle = async (req, res) =>
{
    try 
    {
        const data = await Article.findOneAndUpdate
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

module.exports.supprimerArticle = async (req, res) =>
{
    try 
    {
        await Article.findOneAndRemove
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

module.exports.voirArticle = async (req, res) =>
{
    try 
    {
        const data = await Article.findOne
        (
            {_id: req.params.id}
        )
        res.status(200).json(data)
    } 
    catch (err) 
    {
        res.status(400).json(err)
    }
}