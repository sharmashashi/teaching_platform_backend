const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const schema = new mongoose.Schema({
  firstname: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  lastname: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  email: {
    type: String,
    maxlength: 255,
    minlength: 5,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  phonenumber: {
    type: String,
    minlength: 10,
    maxlength: 14,
    required: true,
  },
});

schema.methods.generateAuthToken = function () {
  return jwt.sign(_.pick(this, ["_id", "email"]),"secretePrivateKey");
};

const User = new mongoose.model("User", schema);

function validateUser(user) {
  const schema = Joi.object({
    firstname: Joi.string().min(2).max(20).required(),
    lastname: Joi.string().min(2).max(20).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
    phonenumber: Joi.string().min(10).max(14).required(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
