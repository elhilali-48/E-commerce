const Responsable = require('../../models/authentifiaction/User')
const bcrypt = require('bcrypt');

module.exports.updateResponsable = async (req, res) =>
{   
    try
    {
        const data = await Responsable.updateOne({ _id: req.params.id }, { ...req.body})
        res.status(201).json({ data })
    }catch(error){
        console.log(error)
    }
}

module.exports.ajouterResponsable_post = async (req, res) =>
{
    try
    {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt)
        
        const responsable = await Responsable.create
        ({

            nom: req.body.nom,
            prenom: req.body.prenom,
            adresse: req.body.adresse,
            codePostale: req.body.codePostale,
            ville: req.body.ville,
            pays: req.body.pays,
            dateDeNaissance: req.body.dateDeNaissance,
            email : req.body.email,
            password: hashpassword,
            telephone: req.body.telephone,
            sexe: req.body.sexe,
            role: req.body.role,

        })      
        res.status(201).json({ responsable: responsable._id })
    }
    catch(err)
    {
        res.status(400).json({ err })
    }
}

module.exports.deleteResponsable = async (req, res) =>
{   
    try
    {
       await Responsable.findOneAndDelete
        ({ _id: req.params.id }, { ...req.body,})    

        res.status(201).json({ message: 'ok' })
    }
    catch(err)
    {
        res.status(400).json({ err })
    }
        
}

module.exports.afficherInformation = async (req, res) =>
{
    try
    {
        const responsable =await Responsable.findById
        ({_id: req.params.id }, {... req.body })

        res.status(201).json({ responsable })
    }
    catch(err)
    {
        res.status(400).json({ err })
    }
    
}
module.exports.afficherInformationall = async (req, res) =>
{   try
    {
        const responsable = await Responsable.find
        (
            {...req.body}
        )
        res.status(201).json({ responsable })
        }
    catch(err)
    {
        res.status(400).json({ err })
    }
    
}

