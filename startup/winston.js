const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
    // process.exit(1);
  });
  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message, ex);
    // process.exit(1);
  });
  winston.add(new winston.transports.File({ filename: "log.log" }));
  // winston.add(
  //   new winston.transports.MongoDB({ db: "mongodb://localhost/hamroguru" })
  // );
};
