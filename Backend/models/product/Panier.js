const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const panierSchema = mongoose.Schema({
  produitselectionner: { type: String, default: "" },
  quantiteselectionne: { type: Number },
  idcli: { type: String },
});

module.exports = mongoose.model("Panier", panierSchema);
