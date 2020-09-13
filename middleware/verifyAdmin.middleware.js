const Token = require("../helpers/tokens");
const User = require("../model/User");

class AdminMiddleware {
    static async verifyAdmin(req, res, next) {
        const { token } = req.headers;
        if(token === ""){
    res.status(404).send({error:"Please provide token first"});
        }  
        const userData = await Token.verifyToken(token);
        const {email} = userData.payload;
        let userExist = await User.findOne({
            email
        });
        if(userExist===null){ 
            res.status(404).send({error:"This user does exist in our system"});  
        }

        if(userData.payload.role !== 'admin'){
            res.status(400).send({error:"You are not authorized to perfom this task"});  
 
        }

        next();

    }

}

module.exports = AdminMiddleware;