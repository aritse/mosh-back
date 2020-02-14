var express = require('express');
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session")
// Sets up the Express App

// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));
app.use(session({ secret: "something secret here", resave: true, saveUninitialized: true,cookie:{maxAge: 7200000} }));
// app.use(cors({
//     origin:["https://*OUR APP NAME HERE*.herokuapp.com"]
// }));

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes");
app.use("/api", routes);

app.post("/api/auth/signup", (req, res) => {
  db.User.create(req.body).then(userData => {
    res.json(userData);
  })
})

app.post("/api/auth/login", (req, res) => {
  db.User.findOne({
    where: {
      name: req.body.name
    }
  }).then(dbUser=>{
    if(bcrypt.compareSync(req.body.password,dbUser.password)){
      req.session.user={
        id:dbUser.id,
        name:dbUser.name
      }
      res.json(req.session.user)
    }
    else{
      res.status(401).json("not logged in")
    }
  })
})

app.get('/api/auth/loggedinuser',(req,res)=>{
  if(req.session.user){
    res.json(req.session.user)
  } else {
    res.status(401).json("not logged in")
  }
})

db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, console.log(`express app is listening on http://localhost:${PORT}`));
});
