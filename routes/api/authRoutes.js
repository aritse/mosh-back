const router = require("express").Router();
const authController = require("../../controllers/authController");

// route to this point: /auth
router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.logIn);
router.route("/loggedinuser").get(authController.loggedInUser)
router.route("/logout").get(authController.logOut);

module.exports = router;