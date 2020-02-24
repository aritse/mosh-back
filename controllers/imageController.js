const db = require('../models')

module.exports = {
    uploadImage: function (req, res) {
        req.body.UserId = req.session.user.id
        db.BasicInfo.create(req.body)
            .then(data => {
                res.json(data)
            }).catch(function (err) {
                console.error(err);
            })
    },
    singleImage: function (req, res) {
        db.BasicInfo.findOne({
            where: {
                UserId: req.session.user.id
            }
        }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            console.error(err);
        });
    },
    allImages: function (req, res) {
        db.BasicInfo.findAll({
            where: {
                id: req.session.user.id
            }
        }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            console.error(err);
        });
    }
}
