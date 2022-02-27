const mongoose = require('mongoose')
const {isEmail} = require('validator')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const clientSchema = mongoose.Schema
({
    nom:{ type: String, required: true, maxlength: 30, minlegth: 2 },
    prenom: { type: String, required: true, maxlength: 30, minlength:2 },
    adresse: { type: String, required: true },
    codePostale: { type: Number, required: true },
    ville: { type: String, required: true },
    pays: { type: String, required: true },
    dateDeNaissance: { type: Date, required: true },
    email: { type: String, required: true, lowercase: true, unique: true, validate: [isEmail], trimp: true },
    password: { type: String, required: true, minlegth: 8},
    telephone: { type: Number, maxlength: 10, minlegth: 10 },
    sexe: { type: Boolean, required: true }, 
    confirmation: { type: Boolean, default:false },
    panier:
    {
        type : ObjectId,
        ref : 'Panier',
    }

});

module.exports = mongoose.model('Client', clientSchema);