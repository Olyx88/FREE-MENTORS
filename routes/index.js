
const express = require("express");
const userRoute = require('./user')
const mentorRoute = require("./mentor.routes");
const router = express.Router();

router.use('/auth', userRoute);
router.use('/mentor', mentorRoute);

module.exports = router;
