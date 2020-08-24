const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { check, validationResult} = require("express-validator/check");
const jwt = require("jsonwebtoken");
const encryptPassword =require ('../helpers/Encryptor');
//const Token =require ('../helpers/tokens');
//const response =require('../helpers/responseHandler');
const comparePassword =require('../helpers/decryptor') ;

class UserController {
    static async createUser(req, res) {
        try {
            let {
                amazina,
                email,
                password,

            } = req.body;
            const encryptedPassword = await encryptPassword(password);

           const user = new User({
                amazina,
                email,
                password:encryptedPassword,
                role:'user'

            });

            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (error) {
            console.log('=-=--==-=-=-- wow you reached in controller',error)

            res.status(500).send("Error in Saving");
        }
    }
// USER LOGIN
static async loginUser (req, res){
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
          min: 6
        })
      ]
        const errors = validationResult(req);
        //console.log("reached me successully  / login");
    
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array()
          });
        }
        const { email, password } = req.body;  
        try {
            let user = await User.findOne({
              email
            });
            if (!user)
              return res.status(400).json({
                message: "User Not Exist"
              });
              const isMatch=comparePassword(password,user.password);
                // console.log('=-=-=-=-=-=-.>>',decyrptedPassword);

         //const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
              return res.status(400).json({
                message: "Incorrect Password !"
              });
      
            const payload = {
              user: {
                id: user.id
              }
            };
      
            jwt.sign(
              payload,
              "randomString",
              {
                expiresIn: 3600
              },
              (err, token) => {
                if (err) throw err;
                res.status(200).json({
                  token
                });
              }
            );
          } catch (e) {
            console.error(e);
            res.status(500).json({
              message: "Server Error ..::.. try again "
            });
          }
        }
      //change usr to mentor
      static async changeMentor (req, res){
          const _id = req.params.userId;
        //  userId = await this.model().select('*', 'id=$1', [userId]);
          //console.log(userId);
            let user = await User.findOne(
              // $where: function() { return this.id == this.userId }
      {    _id}
            );
            if (user===null){
              return res.status(400).json({
                message: "User Not Exist 100%"
              });
            }  
          if (user.role === 'mentor') {
            return res.status(400).json({
              message: "user already mentor"
            });
            }
            // db.user.update(user)
            // where role===user set role===mentor && where _id=userId
           await User.updateOne(
              { $set: { role: "mentor" }},
              {where:{_id}}
           )
           return res.status(200).json({
            message: "user updated successfully"
          });
        //  await this.model().update('role=$1', 'id= $2', [true, user[0].id]);
        //   const mentor = !user[0].mentor;
        //   const data = {
        //    mentor,
        // };
        //  return response.successMessage(req, res, 'User changed to a mentor successfully', HttpStatus.OK, data);
     }
    
    // get all users
static async viewUsers (req, res){
//exports.findAll 
  User.find()
  // User.find(req.params)
  .then(user => {
      res.send(user);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving mentor."
      });
  });
};
  // get all mentor only
  static async viewMentors (req, res){
    //exports.findAll 
      User.find(user.role=='mentor')
      .then(user => {
          res.send(user);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving Mentor."
          });
      });
    };

    // Find a single mentor with a mentorId
static async viewSingle (req, res){
//exports.findOne = (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
      if(!User) {
          return res.status(404).send({
              message: "mentor not found by ID " + req.params.userId
          });            
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "mentor not found by id " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving mentor with id " + req.params.userId
      });
  });
};
    } 

module.exports = UserController;
// export default UserController;
