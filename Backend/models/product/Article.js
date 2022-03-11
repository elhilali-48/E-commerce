const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const articleSchema = mongoose.Schema({
  nom: { type: String, required: true },
  quantite: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  prix: { type: Number, required: true, min: 0 },
  avis: { type: Number, max: 5, min: 0, default: 0 },
  produit: {
    type: ObjectId,
    ref: "Produit",
    required: true,
  },
  personnecomment: 
  [
    [{
      type: ObjectId,
      ref: "Commentaire",
      ref: "Client"
    }],
  ]
});

module.exports = mongoose.model("Article", articleSchema);
