const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const Joi = require("joi");

router.post("/", async (request, response) => {
  const result = validate(request.body);
  if (result.error) {
    return response.status(400).send(result.error.details[0].message);
  }
  let user = await User.findOne({ email: request.body.email });
  if (!user) {
    return response.status(400).send("Invalid email or password.");
  }

  const isValid = await bcrypt.compare(request.body.password, user.password);
  if (!isValid) {
    return response.status(400).send("Invalid email or password.");
  }
  const token = user.generateAuthToken();
  response.send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = router;
