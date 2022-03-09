const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const filtreSchema = mongoose.Schema({
  filtre: [
    { Ram: Number },
    { Stockage: Number },
    { avis: Number },
    { marque: String },
    { couleur: String },
  ],
  articles: [{
    type: ObjectId,
    ref: "Article",
}]
});

module.exports = mongoose.model("Filtre", filtreSchema);
