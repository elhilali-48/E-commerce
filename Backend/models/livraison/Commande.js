const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commandechema = mongoose.Schema(
  {
    idcli: { type: String },
    articles: { type: Array },
    totale: { type: Number, required: true },
    statut: { type: Boolean, default: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commande", commandechema);
