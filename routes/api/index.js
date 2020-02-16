var express = require("express");
var router = express.Router();
var userRoutes = require('./userRoutes');
var authRoutes = require('./authRoutes');

// route to this point: /api
router.use('/user',userRoutes);
router.use('/auth',authRoutes);

module.exports = router;