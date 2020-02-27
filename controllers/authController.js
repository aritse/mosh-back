const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = {
  signUp: function(req, res) {
    db.User.create(req.body).then(userData => {
      const entry = { role: req.body.instrument, UserId: userData.dataValues.id };
      db.Role.create(entry).then(roleData => {
        res.json(roleData);
      });
    });
  },
  logIn: function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUser => {
      console.log(dbUser);
      if (bcrypt.compareSync(req.body.password, dbUser.password)) {
        req.session.user = {
          id: dbUser.id,
          email: dbUser.email,
          firstName: dbUser.firstName,
          bio: dbUser.bio
        };
        res.json(req.session.user);
      } else {
        res.status(401).json("not logged in");
      }
    });
  },
  loggedInUser: function(req, res) {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json("not logged in");
    }
  },
  logOut: function(req, res) {
    //delete session user, logging you out
    req.session.destroy(function() {
      res.send("successfully logged out");
    });
  }
};
