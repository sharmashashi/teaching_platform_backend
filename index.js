require("express-async-errors");
require("./startup/db")();
const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/winston")();

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
