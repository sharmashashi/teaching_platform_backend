const Joi = require("joi");
const mongoose = require("mongoose");

const schema = new mongoose.schema({
  token: { type: String },
  ipAddress: { type: String },
  name: { type: String },
  model: { type: String },
  os: { type: String },
  version: { type: String },
});

const DeviceInfo = new mongoose.model("DeviceInfo", schema);

function validateDeviceInfo(deviceInfo) {
  const schema = new Joi.object({
    token: Joi.string(),
    ipAddress: Joi.String(),
    name: Joi.string(),
    model: Joi.string(),
    model: Joi.string(),
    os: Joi.string(),
    version: Joi.string(),
  });
  return schema.validate(deviceInfo);
}

module.exports.DeviceInfo = DeviceInfo;
module.exports.validate = validateDeviceInfo;
