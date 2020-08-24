//import Joi from  "joi";
const Joi=require("joi");
// const UserController = require("../controllers/user.controller");
class UserMiddleware{
static validsignUp(req,res,next)  {
    const schema ={
        amazina:Joi.string().alphanum().required(),
        email:Joi.string().email().required(),
        password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
       
    }
const result = Joi.validate(req.body, schema);
if (result.error !== null) {
  return res.status(409).send(
    {
      status: 409,
      error: result.error.details[0].message,
    },
  );
}
next();
};

static validsignIn(req,res,next)  {
  const schema ={
      //amazina:Joi.string().alphanum().required(),
      email:Joi.string().email().required(),
      password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
  }
const result = Joi.validate(req.body, schema);
if (result.error !== null) {
return res.status(409).send(
  {
    status: 409,
    error: result.error.details[0].message,
  },
);
}
next();
};}
module.exports = UserMiddleware;