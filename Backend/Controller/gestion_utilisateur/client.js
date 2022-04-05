const Client = require("../../models/authentifiaction/Client");
const bcrypt = require("bcrypt");

module.exports.show_client = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id }).populate(
      "commande"
    );

    res.status(201).json({ client });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.ajouterClient = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    const client = await Client.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.telephone,
      pays: req.body.pays,
      ville: req.body.ville,
      codePostale: req.body.codePostale,
      adresse: req.body.adresse,
      sexe: req.body.sexe,
      dateDeNaissance: req.body.dateDeNaissance,
      password: hashpassword,
      confirmation: false,
    });
    res.status(201).json({ client: client._id });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.modifierClient = async (req, res) => {
  try {
    const chercher_email = await Client.findOne({ _id: req.params.id });

    if (chercher_email.email == req.body.user.email) {
      res.status(400).json("email exist");
    } else {
      const data = await Client.updateOne(
        { _id: req.params.id },
        {
          email: req.body.email,
          telephone: req.body.telephone,
          pays: req.body.pays,
          ville: req.body.ville,
          codePostale: req.body.codePostale,
          adresse: req.body.adresse,
          confirmation: req.body.confirmation,
        }
      );
      res.status(201).json({ data });
    }
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};

module.exports.supprimerClient = async (req, res) => {
  try {
    const client = await Client.deleteOne({ _id: req.params.id });
    res.status(201).json("Supprimé ");
  } catch (error) {
    res.status(404).json({ err });
  }
};

module.exports.informationall = async (req, res) => {
  try {
    const client = await Client.find({ ...req.body });
    res.status(201).json({ client });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.modifieremail = async (req, res) => {
  try {
    const chercher_email = await Client.findOne({_id: req.params.id})
    console.log(chercher_email.email)
    console.log(req.body.email)
    if(chercher_email.email == req.body.email)
    {
      res.status(400).json({err : "Votre nouveau email exsite déjà ! "})
    }
    else
    {
      const data = await Client.updateOne(
      { _id: req.params.id },
        { $set: { email: req.body.email }})
      
        res.status(201).json({ data }); 
    }
  } catch (err) {
    res.status(404).json({ err: "err.message" });
  }
};

module.exports.modifiermdp = async (req, res) => {
  try {

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    
    const chercher_email = await Client.findOne({_id: req.params.id})

    const passwordValide = await bcrypt.compare(
      req.body.ancien,
      chercher_email.password
    );

    const passwordValideNouveau = await bcrypt.compare(
      req.body.password,
      chercher_email.password
    );

    if(!passwordValide)
    {
      res.status(400).json({err: "Ce mot de passe ne correspond pas à votre ancien mot de passe"})
    }
    
    
    else if(passwordValideNouveau){
      res.status(400).json({err: "Vous devez choisir un mot de passe different du dernier mot de passe"})
    }
    else
    {

      const data = await Client.updateOne({_id: req.params.id}, { $set: { password: hashpassword }} )

        res.status(201).json({ msg :"Modifié" }); 
    }
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};
