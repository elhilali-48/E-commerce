const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentaireSchema = mongoose.Schema(
  {
    commentaire: { type: String, maxlength: 100 },
    avie: { type: Number, max: 5, min: 0, default: 0 },
    idclient: [
      {
        type: ObjectId,
        ref: "Client",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commentaire", commentaireSchema);
