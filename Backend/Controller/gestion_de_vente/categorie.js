const Categorie = require('../../models/product/Categorie')


module.exports.ajouterCategorie = async (req, res) =>
{
    try
    {  
        await Categorie.create
        ({

            nom: req.body.nom,

        })      
        res.status(201).json({ message: "ok"})
    }
    catch(err)
    {
        res.status(400).json({ err })
    }    
}

