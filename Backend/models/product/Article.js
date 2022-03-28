const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const articleSchema = mongoose.Schema({
  nom: { type: String, required: true },
  quantite: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  prix: { type: Number, required: true, min: 0 },
  avis: { type: Number, max: 5, min: 0, default: 0 },
  image: {type: String},
  produit: {
    type: ObjectId,
    ref: "Produit",
    required: true,
  },
  personnecomment: 
    [{
      type: ObjectId,
      ref: "Commentaire",
    }],
  livraison : [
    {
      type : ObjectId,
      ref : "Livraison"
    }
  ],

  description_technique:
  [{
    RAM: {type: Number},
    stockage: {type: Number},
    generation: {type: String},
    pouces: {type: Number}
  }]
 

});

module.exports = mongoose.model("Article", articleSchema);
