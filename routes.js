const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./models");

// auth api routes
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
