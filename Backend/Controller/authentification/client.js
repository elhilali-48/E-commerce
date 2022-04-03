const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Client = require("../../models/authentifiaction/Client");
const Panier = require("../../models/product/Panier");
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8108134db847cf",
    pass: "93e8ad02d5a811",
  },
});
const createToken = (id) => {
  return jwt.sign({ id }, "RANDOM_TOKEN_SECRET", { expiresIn: "2h" });
};

module.exports.register_get = (req, res) => {
  res.render("register");
};

module.exports.register_post = async (req, res) => {
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      //generate password
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(req.body.password, salt);

      const client = await Client.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        codePostale: req.body.codePostale,
        ville: req.body.ville,
        pays: req.body.pays,
        dateDeNaissance: req.body.dateDeNaissance,
        email: req.body.email,
        password: hashpassword,
        telephone: req.body.telephone,
        sexe: req.body.sexe,
        confirmation: req.body.confirmation,
      });

      res.status(201).json({ client, message: "le client a bien été créer" });

      var mailOptions = {
        from: '"BestTech Team" <bestteck@info.com>',
        to: req.body.email,
        subject: "Création de votre compte ",
        text: `Bonjour ${req.nom} ${res.prenom}`,
        html: ` 
            <h1>Bonjour ${client.nom} ${client.prenom}</h1>

            <p>
              Vous venez de créer votre compte sur le site BestTech
              Veuillez cliquer sur ce lien pour valider votre compte <br> <button style="background-color : green">Activer mon compte</button> <br>

              Attention, vous devez valider votre compte avant le 20/03/2022, après cela votre compte sera détruit.
            </p>
            
          `,
      };
      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err.message);
        }
        console.log("Message sent: %s", info.messageId);
      });
    } else {
      res
        .status(400)
        .json({ error: "Un utilisateur a déjà créer un compte avec ce email" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};

//login post
module.exports.login_post = async (req, res) => {
  try {
    const client = await Client.findOne({ email: req.body.email });

    if (client) {
      const passwordValide = await bcrypt.compare(
        req.body.password,
        client.password
      );

      if (!passwordValide) {
        res.status(400).json({ error: "Mot de passe incorrect" });
      } else {
        try {
          const token = createToken(client);
          res.cookie("jwt", token, { httpOnly: true }); // http only pour que le coockies ne sera pas visualiser en js
          res.status(200).json({ client: client, token })
        } catch (err) {
          res.status(400).json({ err: err.message, message: "Error" });
        }
      }
    } else {
      res
        .status(400)
        .json({
          error: "Aucun client est enregistrer avec cette adresse email",
        });
    }
  } catch (err) {
    console.log(err);
  }
};

//Validation du compte

module.exports.validerCompte = async (req, res) => {
  try {
    const data = await Client.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    res.status(201).json({ data });
  } catch (error) {
    res.status(404).json({ error });
  }
};
