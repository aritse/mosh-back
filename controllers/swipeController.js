const db = require('../models');

module.exports = {
    // POST route for saving a new user
    // route: /api/user/new
    swipeRight: function (req, res) {
        db.Swipe.create({
            swiperId: req.session.user.id,
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
            swiperId: req.session.user.id,
            swipeeId: req.params.id,
            liked: false
        }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.status(422).json(err);
        });
    },
    loadSwipees: async function (req, res) {
        console.log(req.session || 'we aint found shit')
        try {
            // users i have not swiped on
            const [results, metadata] = await db.sequelize.query(
                `SELECT Users.Id, Users.email, Users.firstName, Users.lastName, Users.zipcode, b.ImageUrl
                FROM Users
                LEFT JOIN Basicinfos b ON b.UserId = Users.id
                WHERE Users.Id != ${req.session.user.id || 1} 
                AND Users.Id NOT IN (SELECT swipes.swipeeId FROM swipes WHERE swipes.swiperId = ${req.session.user.id || 1});
                `);
            res.json(results);
        } catch (e) {
            console.error('Error: ' + e.message);
            res.status(500).json(e);
        }
    },
    getLikes: async function (req, res) {
        try {
            // users who like me
            const [swipeeIds, metadata] = await db.sequelize.query(
                `SELECT Swipes.swiperId 
                FROM Swipes 
                WHERE Swipes.swipeeId = ${req.session.user.id || 1} AND liked = true;
                `);
            res.json(swipeeIds);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getMatchCount: async function (req, res) {
        try {
            const [matchCount, metadata] = await db.sequelize.query(
                `SELECT COUNT(*) as Count
                FROM Swipes 
                WHERE swiperId = ${req.session.user.id || 1} AND liked = true
                AND swipeeId IN (SELECT swiperId FROM swipes WHERE swipeeId = ${req.session.user.id || 1} AND liked = true);
            `
            );

            res.json(matchCount);
        } catch (e) {
            res.json(e.message);
        }
    },
    getMatches: async function (req, res) {
        if (!req.session.user.id) return;
        try {
            // users with whom i have matched
            const [swipes, metadata] = await db.sequelize.query(
                `SELECT  u.id, u.firstName, u.lastName, b.imageUrl
                FROM swipes s
                JOIN users u ON u.id = s.swiperId
                JOIN basicinfos b ON b.UserId = u.id
                WHERE u.id != ${req.session.user.id}
                AND (s.swipeeId = ${req.session.user.id} AND s.liked = true
                    AND s.swiperId IN (SELECT swipeeId FROM swipes WHERE swiperId = ${req.session.user.id}
                    AND liked = true));
                `);
            res.json(swipes);
        } catch (err) {
            res.json(err.message);
        }
    }
}