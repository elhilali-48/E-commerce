const mongoose = require('mongoose')

const panierSchema = mongoose.Schema
({
    
    produitselectionner: { type: Array, default: '' },
    idcli: { type: String,}
})


module.exports = mongoose.model('Panier', panierSchema)
