const Client  = require('../../models/authentifiaction/Client')
const bcrypt = require('bcrypt')

module.exports.show_client= async (req,res)=>{
    try {
        const data = await Client.findOne({_id: req.params.id})
        res.status(201).json({data})
    } catch (error) {
        res.status(404).json(error)
    }
}



module.exports.ajouterClient = async (req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password, salt)
        const client = await Client.create
        ({
            nom : req.body.nom,
            prenom : req.body.prenom,
            email : req.body.email,
            telephone : req.body.telephone,
            pays : req.body.pays,
            ville : req.body.ville,
            codePostale : req.body.codePostale,
            adresse : req.body.adresse,
            sexe : req.body.sexe,
            dateDeNaissance : req.body.dateDeNaissance,
            password : hashpassword,
            confirmation : false,
        })
        res.status(201).json({client : client._id})
    } catch (error) 
    {
        res.status(400).json({error})
    }
}

module.exports.modifierClient = async (req,res)=>{
    try {
        const data = await Client.updateOne({ _id: req.params.id }, { ...req.body })
        res.status(201).json({data})
    } catch (error) {
        res.status(404).json({error})
    }
}


module.exports.supprimerClient = async (req,res)=>{
    try {
        const client = await Client.deleteOne({_id: req.params.id})
        res.status(201).json('Supprimé ')
    } catch (error) {
        res.status(404).json({err})
    }
}