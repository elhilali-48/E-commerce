const mongoose = require('mongoose')


const articleSchema = mongoose.Schema(
    {
        nom: { type: String, required: true },
        quantite: { type: Number, required: true, min: 0 },
        description: { type: String, required: true },
        prix:{ type: Number, required: true, min:0 },
        avis: {type: Number, max: 5, min: 0, default: 0 },
        
    }
)

module.exports = mongoose.model('Article',articleSchema)