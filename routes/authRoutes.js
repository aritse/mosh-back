const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  db.User.create(req.body).then(userData => {
    res.json(userData);
  });
});

router.post("/login", (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(dbUser => {
      if (bcrypt.compareSync(req.body.password, dbUser.password)) {
        req.session.user = {
          id: dbUser.id,
          email: dbUser.email
        };
        res.json(req.session.user);
      } else {
        res.status(401).json("wrong password");
      }
    })
    .catch(err => {
      res.status(401).json("email not found");
    });
});

router.get("/loggedinuser", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json("not logged in");
  }
});

module.exports = router;
