const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.schema({
  children: {
    type: [],
  },
});

const Parent = new mongoose.model("Parent", schema);

function validateParent(parent) {
  const schema = new Joi.object({
    children: Joi.array(),
  });
  return schema.validate(parent);
}

module.exports.Parent = Parent;
module.exports.validate = validateParent;
