const db = require("../models");

module.exports = {
    // GET route for getting all of the users
    // route: /api/users
    allUsers: function (req, res) {
        db.User.findAll({})
            .then(function (dbUser) {
                res.json(dbUser);
            })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json(err.message);
            });
    },
    // Get route for retrieving a single user
    // route: /api/user/:id
    singleUser: function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Role]
        })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json(err.message);
            });
    },
    // POST route for saving a new user
    // route: /api/user/new
    newUser: function (req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function (data) {
                // return data
                res.json(data);
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json(err.message);
            });
    },
    // DELETE route for deleting user
    // Route: /api/user/:id
    deleteUser: function (req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).json(err.message);
            });
    },
    // PUT route for updating user
    // route: /api/user/:id
    updateUser: async function (req, res) {
        try {
            const userData = await db.User.findOne({ id: req.params.id });
            userData.password = req.body.password;
            await userData.save({ fields: ["password"] });
            let { id, firstName, lastName, email, zipcode, bio } = userData;
            const result = { id, firstName, lastName, email, zipcode, bio };
            res.json(result);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    updateBio: async function (req, res) {
        // try {
        //     const userData = await db.User.findOne({ id: req.session.user.id });
        //     userData.bio = req.body.bio;
        //     await userData.save({ fields: ['id', 'bio'] });
        //     let { id, firstName, lastName, email, zipcode, bio } = userData;
        //     const result = { id, firstName, lastName, email, zipcode, bio };
        //     res.json(result);
        // } catch (err) {
        //     res.status(500).json(err.message);
        // }
        db.User.update(req.body,
            {
                where: {
                    id: req.session.user.id
                }
            }).then(bio => {
                res.json(bio)
            })
    },

    updatePassword: async function (req, res) {
        try {
            const userData = await db.User.findOne({ id: req.params.id });
            userData.password = req.body.password;
            await userData.save({ fields: ['password'] });
            let { id, firstName, lastName, email, zipcode, bio } = userData;
            const result = { id, firstName, lastName, email, zipcode, bio };
            res.json(result);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}