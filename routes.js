const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./models");

// auth api routes
router.post("/auth/signup", (req, res) => {
  db.User.create(req.body).then(userData => {
    res.json(userData);
  })
})

router.post("/auth/login", (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUser => {
    if (bcrypt.compareSync(req.body.password, dbUser.password)) {
      req.session.user = {
        id: dbUser.id,
        email: dbUser.email
      }
      res.json(req.session.user)
    }
    else {
      res.status(401).json("not logged in")
    }
  })
})

router.get('/auth/loggedinuser', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.status(401).json("not logged in")
  }
})

router.get('/logout', function (req, res) {
  //delete session user, logging you out
  req.session.destroy(function () {
    res.send('successfully logged out')
    // res.render("home");
  })
})

// user api routes
router.get("/user/all", (req, res) => {
  db.User.findAll()
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

router.get("/user/:id", (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

router.put("/user/update/:id", (req, res) => {
  db.User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(count => {
      if (count > 0) {
        res.json("updated");
      } else {
        res.json("not updated");
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/user/delete/:id", (req, res) => {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(count => {
      if (count > 0) {
        res.json("deleted");
      } else {
        res.json("not deleted");
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
