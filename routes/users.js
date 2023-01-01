const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.post("/", async (request, response) => {
  const result = validate(request.body);
  if (result.error) {
    return response.status(400).send(result.error.details[0].message);
  }
  let user = await User.findOne({ email: request.body.email });
  if (user) {
    return response.status(400).send("User already registered.");
  }

  user = new User(
    _.pick(request.body, [
      "firstname",
      "lastname",
      "email",
      "phonenumber",
      "password",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  response
    .header("x-auth-token", token)
    .send(
      _.pick(user, [
        "_id",
        "firstname",
        "lastname",
        "last",
        "email",
        "phonenumber",
      ])
    );
});

// router.get("/:id", auth, async (request, response) => {
//   const user = await User.findOne({ _id: request.params.id });
//   if (!user) {
//     return response.status(404).send("User not found.");
//   }
//   response.send(
//     _.pick(user, ["_id", "firstname", "lastname", "email", "phonenumber"])
//   );
// });

router.get("/me", auth, async (request, response) => {
  throw new Error("Could not get me");
  const user = await User.findById(request.user._id).select("-password");
  response.send(user);
});

module.exports = router;
