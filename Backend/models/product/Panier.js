const mongoose = require('mongoose')

const panierSchema = mongoose.Schema
({
    
    produitselectionner: { type: Array, default: '' },
    prix_totale: {type: Number, default: 0}
})


module.exports = mongoose.model('Panier', panierSchema)
