const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
module.exports = function () {
  mongoose.connect("mongodb://localhost/hamroguru", (result) => {
    console.log("Connected to mongo db");
  });
};
