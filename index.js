const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);
// app.use(cors({
//     origin:["https://*OUR APP NAME HERE*.herokuapp.com"]
// }));
app.use(session({ secret: "something secret here", resave: true, saveUninitialized: true, cookie: { maxAge: 7200000 } }));

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes"));

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, console.log(`express app is listening on http://localhost:${PORT}`));
});
