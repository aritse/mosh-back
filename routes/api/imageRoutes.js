const router = require("express").Router();
const imageController = require("../../controllers/imageController");

// route to get to this point: /image
router.route("/upload").post(imageController.uploadImage);

module.exports = router;