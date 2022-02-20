const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const categorieSchema = mongoose.Schema
({
    nom: { type:String, required: true, maxlength : 40 },
    product: [ {
        type : ObjectId,
        ref : "Produit"
    } ]
})


module.exports = mongoose.model('Categorie', categorieSchema)


