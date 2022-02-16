const mongoose = require('mongoose')

const categorySchema = mongoose.Schema
({
    nom: { type:String, required: true, maxlength : 40 },
    product: [ producSchema ]
})

const producSchema = mongoose.Schema(
{
    nom: { type :String, required: true} ,
    article: [ articleSchema ]
})

const articleSchema = mongoose.Schema(
{
    nom: { type: String, required: true },
    quantite: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    prix:{ type: Number, required: true, min:0 },
    // dateAjout: {type:Date,required: true, default: Date.now},
    commetaire: [
    {
        content: { type: String, maxlength: 1000 },
        dateCommentaire: { type : Date, default: Date.now }
    }],
    avis: {type: Number, max: 5, min: 0, default: 0 }

},
{
    timestamps: true
})

module.exports = mongoose.model('Categorie', categorySchema)


