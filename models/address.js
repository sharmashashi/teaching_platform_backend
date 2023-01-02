const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    minlength: 2,
    required: true,
  },
  city: {
    type: String,
    minlength: 2,
    required: true,
  },
  district: {
    type: String,
    minlength: 2,
    required: true,
  },
});

const Address = new mongoose.model("Address", schema);

function validateAddress(address) {
  const schema = Joi.object({
    street: Joi.string().min(2).required(),
    city: Joi.string().min(2).required(),
    district: Joi.string().min(2).required(),
  });
  return schema.validate(address);
}

module.exports.Address = Address;
module.exports.validate = validateAddress;
