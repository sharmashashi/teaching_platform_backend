const { User, validate } = require("../models/user");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (request, response) => {
  const result = validate(request.body);
  if (result.error) {
    return response.status(400).send(result.error.details[0].message);
  }
  let user = await User.findOne({ email: request.body.email });
  if (user) {
    return response.status(400).send("User already registered.");
  }

  user = new User({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    phonenumber: request.body.phonenumber,
    password: request.body.password,
  });
  await user.save();
  response.send(user);
});

module.exports = router;
