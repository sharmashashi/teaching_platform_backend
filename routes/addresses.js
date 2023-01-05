const { response } = require("express");
const auth = require("../middleware/auth");
const { Address, validate } = require("../models/address");
const _ = require("lodash");

const router = require("express").Router();

module.exports = router;

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  let address = await Address.findOne({ userId: req.user._id });
  if (address) {
    return res.status(400).send("Address already exists.");
  }
  req.body.userId = req.user._id;
  address = new Address(req.body);
  await address.save();
  res.send(address);
});
router.put("/:id", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  let address = await Address.findById(req.params.id);
  if (!address) {
    return res.status(400).send("Could find address.");
  }
  if (req.body.street) address.street = req.body.street;
  if (req.body.city) address.city = req.body.city;
  if (req.body.district) address.district = req.body.district;
  await address.save();
  res.send(address);
});
