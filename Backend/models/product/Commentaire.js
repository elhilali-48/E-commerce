const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const commentaireSchema = mongoose.Schema
({
    commentaire: { type:String , maxlength : 100 },
    

})


module.exports = mongoose.model('Commentaire', commentaireSchema)


