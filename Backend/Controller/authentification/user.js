const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8108134db847cf",
    pass: "93e8ad02d5a811",
  },
});

const User = require("../../models/authentifiaction/User");

const createToken = (id) => {
  return jwt.sign({ id }, "RANDOM_TOKEN_SECRET", { expiresIn: "2h" });
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_post = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const passwordValid = await bcrypt.compare(
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

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("logout success");
  res.redirect("/admin/login");
};
