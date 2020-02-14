const express = require("express");
const router = express.Router();
const db = require("./models");

// auth api routes
router.post("/auth/signup", (req, res) => {
  db.User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

router.post("/auth/login", (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user.password === req.body.password) {
        res.json("success");
      } else {
        res.status(401).json("failure");
      }
    })
    .catch(err => res.status(401).json(err));
});

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
