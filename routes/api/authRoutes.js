const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./models");

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

module.exports = router;