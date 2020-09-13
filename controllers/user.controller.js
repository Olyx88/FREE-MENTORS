const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { check, validationResult} = require("express-validator/check");
const jwt = require("jsonwebtoken");
const encryptPassword =require ('../helpers/Encryptor');
const Token =require ('../helpers/tokens');
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
                role:'user' //mentor

              

            });
            let userExist = await User.findOne({
              email
            });
            if(userExist){
              res.status(409).send({error:"User already exist in our system"});  
            }
;            const ser = await user.save();
          
            const payload = {
                
                    id: user.id,
                    email:user.email,
                    // role,
                    amazina:user.amazina
                    // pasword // cant be in token
              
            };
           const token= await Token.generateToken({payload});
              res.status(200).json({
                    token
                    });

        } catch (error) {
            console.log('=-=--==-=-=-- wow you reached in controller',error)

            res.status(500).send(error,"Error in Saving");
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
               
            if (!isMatch)
              return res.status(400).json({
                message: "Incorrect Password !"
              });
              const payload = {
                
                _id: user._id,
                amazina: user.amazina,
                email: user.email,
                role: user.role,
          
        };
              const token= await Token.generateToken({payload});
                          res.status(200).json({
                            messsage:"You  have logged in successfully",
                  token
                });

            // const payload = {
            //   user: {
            //     id: user.id
            //   }
            // };
      
            // jwt.sign(
            //   payload,
            //   "randomString",
            //   {
            //     expiresIn: 3600
            //   },
            //   (err, token) => {
            //     if (err) throw err;
            //     res.status(200).json({
            //       token
            //     });
            //   }
            // );
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
        
          const checkUser= await User.findById(_id);
        console.log(">>>>>>>>>>>>>>>>>>>>>>",checkUser);
          if (checkUser===null){
            
            return res.status(400).json({
              message: "User Not Exist 100%"
            });
          } 
          if (checkUser.role==='mentor') {
            return res. status(400).json({
              message: 'user already mentor'
            })
          }
          let user = await User.findByIdAndUpdate(
              // $where: function() { return this.id == this.userId }
      // {    _id}
      _id , { role:'mentor'}, {new : true, runValidators: true}
            );
          
            console.log (user);
            
           return res.status(200).json({
            message: "User account changed ",
            data:user
          })
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
    const mentors= await User.find({role: 'mentor'});
    // console.log(mentors);
    return res.status(200).json({
      message: "all mentors ",
      data:mentors
    })

    };

//Find a single mentor with a mentorId

static async viewSingle (req, res){
const mentorId=User.findById(req.params._id);

 if(mentorId.role==='mentor'){
  return res.status(200).json({
    message: "mentors found by ID ",
    data: mentorId
  })
  
  }
  //console.log("no mentor found");
};
    } 

module.exports = UserController;
// export default UserController;
 