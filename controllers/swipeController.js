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
    // load swipe users
    loadSwipees: async function (req, res) {
        try {
            const [results, metadata] = await db.sequelize.query(
                `SELECT Users.Id, Users.email, p.firstName, p.lastName
                FROM Users
                JOIN profiles p on p.UserId = Users.Id
                WHERE Users.Id != 1 
                AND Users.Id NOT IN (SELECT swipeeId FROM swipes WHERE swiperId = ${req.session.userId || 1})
                `);
            res.json(results);
        } catch (e) {
            res.status(500).json(e);
        }
        // db.Users.findAll({
        //     attributes: {
        //         include: [
        //             [
        //                 // Note the wrapping parentheses in the call below!
        //                 sequelize.literal(`(
        //                         SELECT COUNT(*)
        //                         FROM reactions AS reaction
        //                         WHERE
        //                             reaction.postId = post.id
        //                             AND
        //                             reaction.type = "Laugh"
        //                     )`),
        //                 'laughReactionsCount'
        //             ]
        //         ]
        //     }
        // });
    }
}