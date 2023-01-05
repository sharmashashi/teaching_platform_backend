const auth = require("../middleware/auth");
const { DeviceInfo, validate } = require("../models/device-info");
const router = require("express").Router();

module.exports = router;

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  let deviceInfo = await DeviceInfo.findOne({ userId: req.user._id });
  if (deviceInfo) {
    return res.status(400).send("Device information already exists.");
  }
  req.body.userId = req.user._id;
  deviceInfo = new DeviceInfo(req.body);
  await deviceInfo.save();
  res.send(deviceInfo);
});

router.put("/:id", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  let deviceInfo = await DeviceInfo.findById(req.params.id);
  if (!deviceInfo) {
    return res.status(400).send("Could not find device information.");
  }
  if (req.body.name) deviceInfo.name = req.body.name;
  if (req.body.token) deviceInfo.token = req.body.token;
  if (req.body.ipAddress) deviceInfo.ipAddress = req.body.ipAddress;
  if (req.body.model) deviceInfo.model = req.body.model;
  if (req.body.os) deviceInfo.os = req.body.os;
  if (req.body.version) deviceInfo.version = req.body.version;
  await deviceInfo.save();
  res.send(deviceInfo);
});
