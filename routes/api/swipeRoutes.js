const router = require("express").Router();
const swipeController = require("../../controllers/swipeController");

// route to this point: /swipe
router.route("/like/:id").post(swipeController.swipeRight);

router.route("/nope/:id").post(swipeController.swipeLeft);

module.exports = router;
