const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../../models/authentifiaction/Client');


const createToken = (id) => {
    return jwt.sign({ id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '2h' })
}


module.exports.register_get = (req, res) =>
{
    res.render('register');
}

module.exports.register_post = async (req, res) =>
{   
    try
    {
//generate password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt)

        const client = await Client.create
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
            confirmation: req.body.confirmation,

        })      
        res.status(201).json({ client: client._id })
    }
    catch(err)
    {
        res.status(400).json({ err })
    }
}

module.exports.login_get = (req, res) =>
{
    res.send('HII')
    res.render('login')
}
module.exports.logout = (req, res) =>
{
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
}

//login post
module.exports.login_post = async (req, res) =>
{
    try
    {
        const client = await Client.findOne({ email: req.body.email })
        

        if(client)
        {
            const passwordValide = await bcrypt.compare(req.body.password, client.password)

            if(!passwordValide)
             {
                 res.status(404).json("Password no mathc")
             }
             else
             {
                 try{
                        const token = createToken(client._id)
                        console.log(token)
                        res.cookie('jwt', token, { httpOnly: true })
                        res.status(200).json({ client: client, token })
                 }
                 catch(err){
                    res.status(400).json({ err: err.message })
                 }
             }
            
        }
        else{
            res.status(404).json({message : "Aucn client est enregistrer avec cet adresse emailu"})
        }
        

        
        
    }
    catch(err)
    {
        console.log(err)
    }
}