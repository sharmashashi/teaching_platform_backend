const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const privateKey = fs.readFileSync(
      "/Users/shashisharma/Projects/HamroGuru/hamro_guru_backend/config/jwt/key",
      "utf8"
    );
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send("Invalid token.");
  }
};
