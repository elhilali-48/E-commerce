const mongoose = require('mongoose')
const {isEmail} = require('validator')
const clientSchema = mongoose.Schema
({
    nom:{ type: String, required: true, maxlength: 30, minlegth: 2 },
    prenom: { type: String, required: true, maxlength: 30, minlength:2 },
    adresse: { type: String, required: true },
    codePostale: { type: Number, required: true, maxlength: 5, minlegth: 2 },
    ville: { type: String, required: true},
    pays: { type: String, required: true },
    dateDeNaissance: { type: Date, required: true },
    email: { type: String, required: true, lowercase: true, unique: true, validate: [isEmail], trimp: true },
    password: { type: String, required: true, minlegth: 8, required: true},
    telephone: { type: Number, maxlength: 10, minlegth: 10 },
    sexe: { type: Boolean, required: true }, 
    confirmation: { type: Boolean, default:false },
});

module.exports = mongoose.model('Client', clientSchema);