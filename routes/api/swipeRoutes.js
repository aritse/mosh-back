const router = require("express").Router();
const userController = require("../../controllers/userController");

// route to this point: /swipe
router.route("/like/:id")
    .post(swipeController.swipeRight);

router.route("/nope/:id")
    .post(swipeController.swipeLeft);

module.exports = router;