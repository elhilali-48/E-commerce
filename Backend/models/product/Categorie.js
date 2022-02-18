const mongoose = require('mongoose')

const categorySchema = mongoose.Schema
({
    nom: { type:String, required: true, maxlength : 40 },
    product: [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Produit"
    } ]
})


module.exports = mongoose.model('Categorie', categorySchema)


