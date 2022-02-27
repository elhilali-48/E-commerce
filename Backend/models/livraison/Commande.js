const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const livraisonSchema = mongoose.Schema
({
    articles: 
    [{
        type : ObjectId,
        ref : 'Article',

    }],
    
},
{ timestamps: true }
)


module.exports = mongoose.model('Livraison', livraisonSchema)
