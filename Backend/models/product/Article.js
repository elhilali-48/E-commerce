const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const articleSchema = mongoose.Schema({
  nom: { type: String, required: true },
  quantite: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  prix: { type: Number, required: true, min: 0 },
  avis: { type: Number },
  promotion: { type: Number, min: 0, max: 100 },
  image: { type: String },
  personneavis: {type: Array},
  produit: {
    type: ObjectId,
    ref: "Produit",
    required: true,
  },
  personnecomment: [
    {
      type: ObjectId,
      ref: "Commentaire",
    },
  ],
  livraison: [
    {
      type: ObjectId,
      ref: "Livraison",
    },
  ],
  ram: {type: Number},
  stockage: {type: Number},
  processeur: {type: String},
  pouces: {type: Number}
  
 

});

module.exports = mongoose.model("Article", articleSchema);
