const mongoose = require("mongoose");
const winston = require("winston");
mongoose.set('strictQuery', true);
module.exports = function () {
  mongoose.connect("mongodb://localhost/hamroguru", (result) => {
    winston.info("Connected to mongo db");
  });
};
