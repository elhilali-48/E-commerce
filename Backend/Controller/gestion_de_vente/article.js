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
        res.status(201).json({ message: "ok"})
    }
    catch(err)
    {
        res.status(400).json({ err: "fhkfvkjf" })
    }    
}

