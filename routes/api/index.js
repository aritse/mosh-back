var express = require("express");
var router = express.Router();
var userRoutes = require('./userRoutes');

// route to this point: /api
router.use('/user',userRoutes);

module.exports = router;