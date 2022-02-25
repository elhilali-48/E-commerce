const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const panierSchema = mongoose.Schema
({
    articles: 
    [{
        type : ObjectId,
        ref : 'Article',

    }],
    totale: { type: Number}
},
{ timestamps: true }
)


module.exports = mongoose.model('Panier', panierSchema)
