const db = require("../models");

module.exports = {
  join: function(req, res) {
    res.send("joining to chat");
  },
  chat: function(req, res) {
    res.send("chatting in chat");
  }
};
