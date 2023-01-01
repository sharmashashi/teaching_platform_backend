require("express-async-errors");
require("winston-mongodb");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");
require("./startup/db")();
const express = require("express");
const winston = require("winston");
const app = express();
winston.add(new winston.transports.File({ filename: "log.log" }));
winston.add(
  new winston.transports.MongoDB({ db: "mongodb://localhost/hamroguru" })
);

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
