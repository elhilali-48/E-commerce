const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const commandechema = mongoose.Schema
({

    idcli: { type: String },
    articles: {type: Array},
    livraison: {type: String},
    totale: { type: Number },
    

},
{ timestamps: true }
)


module.exports = mongoose.model('Commande', commandechema)
