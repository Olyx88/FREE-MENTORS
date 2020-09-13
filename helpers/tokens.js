
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// class Tokens{
     exports.generateToken=({payload})=>{
        
        const token = jwt.sign({
            payload 
                },
                process.env.JWTKEY, { expiresIn: '1d' });
                return token;
    }

    exports.verifyToken=(token)=>{
        return jwt.verify(token, process.env.JWTKEY);  
    }
// }

