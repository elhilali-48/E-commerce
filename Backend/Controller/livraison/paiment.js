const stripe = require("stripe")(
  "sk_test_51KgsrTBLBTW0nqHlAfUClZImkoo5I9s2tQt9sMkC37FYpyfMfdYA90F2epgY0MhEjaIt24AoqLC9AC4P6W9wdcaH00ktVYyvPB"
);

module.exports.ajouterpaiment = async (req, res) => {


  let a = req.body.client.nom
  let b = req.body.client.prenom
  console.log(tab);
  try {
    
    const product = await stripe.products.create({ name: a+" "+b , tab : tab });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 0.5 * 100,
      currency: "eur",
    });

    res.status(201).json(price);
  } catch (err) {
    res.status(400).json(err);
  }
};
