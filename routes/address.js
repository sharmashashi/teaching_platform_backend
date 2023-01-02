const { response } = require("express");
const auth = require("../middleware/auth");
const { Address, validate } = require("../models/address");
const _ = require("lodash");

const router = require("express").Router();

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const address = Address.findOne({ userId: req.user._id });
  if (address) {
    res.status(405).send("Method not allowed.");
  }
  req.body.userId = req.user.userId;
  address = new Address(_.pick(req.body));
  response.send(address);
});

module.exports = router;
