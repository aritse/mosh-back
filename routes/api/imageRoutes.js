const router = require("express").Router();
const imageController = require("../../controllers/imageController");

// route to get to this point: /image
router.route("/upload").post(imageController.uploadImage);
router.route("/:id").get(imageController.singleImage);

module.exports = router;