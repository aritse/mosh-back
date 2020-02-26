const router = require("express").Router();
const userController = require("../../controllers/userController");

// route to this point: /user
router.route("/")
    .get(userController.allUsers)

router.route("/bio")
    .put(userController.updateBio);

router.route("/:id")
    .get(userController.singleUser)
    .put(userController.updateBio)
    .delete(userController.deleteUser);

router.route("/password/:id")
    .put(userController.updatePassword);

router.route("/new").post(userController.newUser);

module.exports = router;