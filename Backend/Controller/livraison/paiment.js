const stripe = ("stripe")(process.env.STRIPE_KEY);

module.exports.ajouterpaiment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "EUR",
    },
    (stripErr, stripRes) => {
      if (stripErr) {
        res.status(500).json(stripErr);
      } else {
        res.status(201).json(stripRes);
      }
    }
  );
};
