const mongoose = require('mongoose')

const producSchema = mongoose.Schema(
    {
        nom: { type :String, required: true} ,
        articles: [ {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Article"
        } ]
    }
)

module.exports = mongoose.model('Produit', producSchema)
