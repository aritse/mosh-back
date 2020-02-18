const router = require("express").Router();
const chatController = require("../../controllers/chatController");

// route to this point: /user
router.route("/join").get(chatController.join);
router.route("/chat").get(chatController.chat);

module.exports = router;
