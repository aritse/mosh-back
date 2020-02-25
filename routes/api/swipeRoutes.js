const router = require("express").Router();
const swipeController = require("../../controllers/swipeController");

// route to this point: /swipe
router.route('/load').get(swipeController.loadSwipees);
router.route('/likes').get(swipeController.getLikes);
router.route('/matches').get(swipeController.getMatches);
router.route('/matchcount').get(swipeController.getMatchCount);
router.route("/like/:id").post(swipeController.swipeRight);
router.route("/nope/:id").post(swipeController.swipeLeft);

module.exports = router;
