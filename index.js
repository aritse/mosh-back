const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes");
app.use("/api", routes);

const port = 8080;

const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, console.log(`express app is listening on http://localhost:${port}`));
});
