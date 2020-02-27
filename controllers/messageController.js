const db = require("../models");

module.exports = {
  saveMessage: (req, res) => db.Message.create(req.body).then(message => res.json(message)),

  getSenderMessages: function(req, res) {
    console.log("got sender id:", req.params.id);
    db.Message.findAll({
      where: {
        senderId: req.params.id
      }
    })
      .then(function(dbMessages) {
        res.json(dbMessages);
      })
      .catch(function(err) {
        console.error(err);
      });
  },
  getReceiverMessages: function(req, res) {
    db.Message.findAll({
      where: {
        receiverId: req.session.user.id
      }
    })
      .then(function(dbMessages) {
        res.json(dbMessages);
      })
      .catch(function(err) {
        console.error(err);
      });
  },
  deleteSingleMessage: function(req, res) {
    db.Message.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.error(err);
      });
  },
  deleteSenderMessages: function(req, res) {
    db.Message.destroy({
      where: {
        senderId: req.params.id
      }
    })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.error(err);
      });
  },
  deleteReceiverMessages: function(req, res) {
    db.Message.destroy({
      where: {
        receiverId: req.params.id
      }
    })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};
