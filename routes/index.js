
const express = require("express");
const userRoute = require('./user')
const router = express.Router();

router.use('/auth', userRoute);

module.exports = router;
