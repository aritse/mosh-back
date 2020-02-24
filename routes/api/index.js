var express = require("express");
var router = express.Router();
var userRoutes = require("./userRoutes");
var authRoutes = require("./authRoutes");
var chatRoutes = require("./chatRoutes");
var imageRoutes = require('./imageRoutes')
var swipeRoutes = require("./swipeRoutes");
var messageRoutes = require("./messageRoutes");

// route to this point: /api
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/image", imageRoutes);
router.use("/swipe", swipeRoutes);
router.use("/message", messageRoutes);

module.exports = router;
