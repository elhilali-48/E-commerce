const mongoose = require('mongoose')

const panierSchema = mongoose.Schema
({
    
    produitselectionner: { type: Array, default: '' },
    idcli: { type: String, required : true}
})


module.exports = mongoose.model('Panier', panierSchema)
