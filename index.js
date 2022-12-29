const users = require("./routes/users");
const auth = require("./routes/auth");
require("./startup/db")();
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
