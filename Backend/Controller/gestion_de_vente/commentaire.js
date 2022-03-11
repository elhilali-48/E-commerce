const bodyParser = require('body-parser')
const Commentaire = require('../../models/product/Commentaire')
const Client = require('../../models/authentifiaction/Client')
const Article = require('../../models/product/Article')


module.exports.ajouter = async (req, res) =>
{
    try
    {
      const comment = await Commentaire.create
      (
        { commentaire:  req.body.commentaire },

      )
        await Article.updateOne
        ( 
            { _id: req.params.id }, 
            { personnecomment:
              [
                res.locals.client.id, comment
              ]
            }


            
        )
// -----------------------------------------------------------------------------------------------------------------------------------------------

      res.status(201).json({ comment})
    }
    catch(err)
    {
        res.status(400).json({ err: err.message })
    }
}

