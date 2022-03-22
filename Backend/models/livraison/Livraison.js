const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const livraisonSchema = mongoose.Schema
({
    company : {type : String, required : true},
    type : {type : String, enum :["Livraison Gratuite",'Livraison Standard'],required : true},
    duree : {type : Number,required : true , min: 0},
    prix : {type : Number, required : true, min : 0}
},
{ timestamps: true }
)


module.exports = mongoose.model('Livraison', livraisonSchema)
