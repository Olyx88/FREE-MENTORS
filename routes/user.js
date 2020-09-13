
const express = require("express");

const UserController = require("../controllers/user.controller");
const UserMiddleware = require("../middleware/uservalidator");
const AdminMiddleware = require("../middleware/verifyAdmin.middleware");
const router = express.Router();
router.post('/signup',UserMiddleware.validsignUp, UserController.createUser);
router.post('/signin',UserMiddleware.validsignIn, UserController.loginUser);
router.patch('/user/:userId',AdminMiddleware.verifyAdmin, UserController.changeMentor);
router.get('/user',AdminMiddleware.verifyAdmin,UserController.viewUsers) ;

module.exports = router;

