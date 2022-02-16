const Responsable = require('../../models/authentifiaction/User')

module.exports.updateResponsable = async (req, res) =>
{   
    try
    {
        await Responsable.findOneAndUpdate(

            {_id: req.params.id },
            { $set: { email: req.body.email }},
            { $set: { adresse: req.body.adresse }},
            { $set: { codePostale: req.body.codePostale }},
            { $set: { ville: req.body.ville }},
            { $set: { pays: req.body.pays }},
            { $set: { téléphone: req.body.téléphone }},
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, data) => {
                if(err)
                {
                    return res.status(500).json(err)
                } 
                if(!err)
                {
                    return res.status(201).json({ data })
                } 
            }     
        )
    }catch(error){
        console.log(error)
    }
}

module.exports.ajouterResponsable_post = async (req, res) =>
{
    try
    {
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
            password: req.body.password,
            telephone: req.body.telephone,
            sexe: req.body.sexe,

        })      
        res.status(201).json({ responsable: responsable._id })
    }
    catch(err)
    {
        res.status(400).json({ err })
    }
}

module.exports.deleteResponsable = async (req, res, next) =>
{   
    try
    {
       await Responsable.findOneAndDelete
        ({ _id: req.params.id }, { ...req.body, _id: req.params.id })    

        res.status(201).json({ message: 'ok' })
    }
    catch(err)
    {
        res.status(400).json({ err })
    }
        
}

module.exports.afficherInformation = (req, res, next) =>
{
    try
    {
        const respo = Responsable.findById
        ({_id: req.params.id }, {... req.body, _id: req.params.id })

        res.status(201).json({ respo })
    }
    catch(err)
    {
        res.status(400).json({ err })
    }
    
}