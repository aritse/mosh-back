const db = require('../models')

module.exports = {
    uploadImage: function (req, res) {
        db.BasicInfo.create(req.body)
            .then(data => {
                res.json(data)
            }).catch(function (err) {
                console.error(err);
            })
    }
}