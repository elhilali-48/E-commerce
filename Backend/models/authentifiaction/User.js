const mongoose = require("mongoose");
const { isEmail } = require("validator");


// c'est la base de données on a spécifier le type
const userSchema = mongoose.Schema({
  nom: { type: String, required: true, maxlength: 30, minlegth: 2 },
  prenom: { type: String, required: true, maxlength: 30, minlength: 2 },
  adresse: { type: String, required: true },
  codePostale: { type: Number, required: true },
  ville: { type: String, required: true },
  pays: { type: String, required: true },
  dateDeNaissance: { type: Date, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [isEmail],
    trimp: true,
  },
  password: { type: String, required: true, minlegth: 8 },
  telephone: { type: Number, maxlength: 10, minlegth: 10 },
  sexe: { type: Boolean, required: true },
  role: { type: Boolean, required: true, default: false },
});

// on a utilisé exposrt pour pouvoir k'utilisr ailleur
module.exports = mongoose.model("User", userSchema);
