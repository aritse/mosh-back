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
    },
    loadSwipees: async function (req, res) {
        try {
            // users i have not swiped on
            const [results, metadata] = await db.sequelize.query(
                `SELECT Users.Id, Users.email, Users.firstName, Users.lastName, b.ImageUrl
                FROM Users
                LEFT JOIN Basicinfos b ON b.UserId = Users.id
                WHERE Users.Id != ${req.session.userId || 1} 
                AND Users.Id NOT IN (SELECT swipes.swipeeId FROM swipes WHERE swipes.swiperId = ${req.session.userId || 1});
                `);
            res.json(results);
        } catch (e) {
            res.status(500).json(e);
        }
    },
    getLikes: async function (req, res) {
        try {
            // users who like me
            const [swipeeIds, metadata] = await db.sequelize.query(
                `SELECT Swipes.swiperId 
                FROM Swipes 
                WHERE Swipes.swipeeId = ${req.session.userId || 1} AND liked = true;
                `);
            res.json(swipeeIds);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getMatches: async function (req, res) {
        try {
            // users with whom i have matched
            const [swipes, metadata] = await db.sequelize.query(
                `SELECT * 
                    FROM Swipes 
                    WHERE swiperId = ${req.session.userId || 1} AND liked = true
                    AND swipeeId IN (SELECT swiperId FROM swipes WHERE swipeeId = ${req.session.userId || 1} AND liked = true);
                `);
            res.json(swipes);
        } catch (err) {
            res.json(err.message);
        }
    }
}