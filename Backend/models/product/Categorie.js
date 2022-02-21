const mongoose = require('mongoose')

const categorieSchema = mongoose.Schema
({
    nom: { type:String, required: true, maxlength : 40 },
})


module.exports = mongoose.model('Categorie', categorieSchema)


