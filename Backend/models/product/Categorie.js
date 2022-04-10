const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


// c'est la base de données on a spécifier le type
const categorieSchema = mongoose.Schema({
  nom: { type: String, required: true, maxlength: 40 },
  produit: [
    {
      type: ObjectId,
      ref: "Produit",
    },
  ],
});

module.exports = mongoose.model("Categorie", categorieSchema);
