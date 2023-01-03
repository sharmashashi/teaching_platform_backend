require("express-async-errors");
require("./startup/db")();
const express = require("express");
const winston = require("winston");
const app = express();
require("./startup/routes")(app);
require("./startup/winston")();

const port = 8000;
app.listen(port, () => {
  winston.info(`Server is listening on port ${port}`);
});
