const bodyParser = require('body-parser')
const Article = require('../../models/product/Article')


module.exports.ajouter = async (req, res) =>
{
    try
    {
      const comment = await Article.updateOne
      (
        {}, { $push: { commentaire: comment }}
      )
      res.status(201).json({ comment})
    }
    catch(err)
    {
        res.status(400).json({ err: message })
    }
}

