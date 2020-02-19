const db = require('../models');

module.exports = {
    // POST route for saving a new user
    // route: /api/user/new
    swipeRight: function (req, res) {
        db.Swipe.create({
            swiperId: req.session.userId,
            swipeeId: req.params.id,
            liked: true
        }).then(function (data) {
            // return data
            res.json(data);
        }).catch(function (err) {
            console.error(err);
        })
    },
    swipeLeft: function (req, res) {
        db.Swipe.create({
            swiperId: req.session.userId,
            swipeeId: req.params.id,
            liked: false
        }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.status(422).json(err);
        });
    }
}