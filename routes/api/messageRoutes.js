const router = require("express").Router();
const messageController = require("../../controllers/messageController");

// route to this point: /message
router.route("/").post(messageController.saveMessage);
router.route("/sender/:id").get(messageController.getSenderMessages);
router.route("/receiver/:id").get(messageController.getReceiverMessages);

router.route("/:id").delete(messageController.deleteSingleMessage);
router.route("/sender/:id").delete(messageController.deleteSenderMessages);
router.route("/receiver/:id").delete(messageController.deleteReceiverMessages);

router.route("/all").get(messageController.getChatMessages);

module.exports = router;
