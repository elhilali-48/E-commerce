const bodyParser = require("body-parser");
const Commentaire = require("../../models/product/Commentaire");
const Article = require("../../models/product/Article");

module.exports.ajouter = async (req, res) => {
  try {
    const comment = await Commentaire.create({
      commentaire: req.body.commentaire,
      idclient: res.locals.client.id,
    });
    await Article.updateOne(
      { _id: req.params.id },
      { $push: { personnecomment: comment } }
    );
    res.status(201).json({ comment });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
module.exports.voircommentaire = async (req, res) => {
  try {
    const comment = await Commentaire.findOne(
      { _id: req.params.id },
      { ...req.body }
    );

    res.status(200).json({ comment });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
module.exports.modifier = async (req, res) => {
  try {
    const comment = await Commentaire.findByIdAndUpdate(

      { _id: req.params.id }, { $set: { commentaire: req.body.commentaire } }
    );
    res.status(201).json({ comment });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports.supprimer = async (req,res) =>
{
  try 
  {
      await Commentaire.findByIdAndRemove
      (
        {_id: req.params.id}
      )
      res.status(201).json({ comment: "ce commentaire a bien été supprimer" });
  } 
  catch (err) 
  {
      res.status(400).json({ err: err.message });
  }
}
