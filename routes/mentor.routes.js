const express = require("express");
const UserController = require("../controllers/user.controller");
//const UserMiddleware = require("../middleware/uservalidator");
const AdminMiddleware = require("../middleware/verifyAdmin.middleware");
const router = express.Router();

router.get('/',AdminMiddleware.verifyAdmin,UserController.viewMentors);
router.get('/:mentorId',UserController.viewSingle); 
module.exports = router;