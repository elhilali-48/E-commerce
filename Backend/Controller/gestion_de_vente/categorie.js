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

module.exports.voirall = async (req, res) =>
{
    try {

        const data = await Categorie.find
        (

        )
        res.status(200).json(data)
        
    } 
    catch (err) 
    {
       res.status(400).json({err}) 
    }
}
