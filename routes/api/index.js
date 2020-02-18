var express = require("express");
var router = express.Router();
var userRoutes = require("./userRoutes");
var authRoutes = require("./authRoutes");
var chatRoutes = require("./chatRoutes");

// route to this point: /api
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);

module.exports = router;
