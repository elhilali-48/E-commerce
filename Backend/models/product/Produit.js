const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const produitSchema = mongoose.Schema({
  nom: { type: String },
  categorie: {
    type: ObjectId,
    ref: "Categorie",
    required: true,
  },
  article: [
    {
      type: ObjectId,
      ref: "Article",
    },
  ],
});

module.exports = mongoose.model("Produit", produitSchema);
