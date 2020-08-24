
const express = require("express");

const UserController = require("../controllers/user.controller");

const UserMiddleware = require("../middleware/uservalidator");
const router = express.Router();
router.post('/signup',UserMiddleware.validsignUp, UserController.createUser);
router.post('/signin',UserMiddleware.validsignIn, UserController.loginUser);
router.patch('/user/:userId', UserController.changeMentor);
router.get('/user',UserController.viewUsers) 
router.get('/mentor',UserController.viewMentors)
router.get('/mentor/:userId',UserController.viewSingle)
module.exports = router;

