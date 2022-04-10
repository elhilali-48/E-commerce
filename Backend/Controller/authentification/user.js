const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/authentifiaction/User");

// cette fonction crée un token
const createToken = (id) => {
  return jwt.sign({ id }, "RANDOM_TOKEN_SECRET", { expiresIn: "2h" });
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

// permet au responsable de se connecté
module.exports.login_post = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const passwordValid = await bcrypt.compare(
        // on 'utilise bcrypt compare pour comparer le mot de passe de la base de données avec ce qui était donnée
        req.body.password,
        user.password
      );
      if (!passwordValid) {
        res.status(400).json({ error: "Mot de passe incorrect" });
      } else {
        try {
          const token = createToken(user);
          res.cookie("jwt", token, { httpOnly: true });
          res.status(200).json({ user: user, token });
        } catch (error) {
          res.status(400).json({ errors });
        }
        res.status(201).json({ user: user });
      }
    } else {
      res.status(400).json({ error: "Aucun client enregistrer avec ce email" });
    }
  } catch (error) {
    console.log(error);
  }
};

// dans cette fonction on a fait un set de la duré de token avec une redirection de l ver la page de la page connexion
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("logout success");
  res.redirect("/admin/login");
};
