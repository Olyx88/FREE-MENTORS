//import bcrypt from 'bcrypt';
const bcrypt=require('bcrypt');
const encryptPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

//export default encryptPassword;
module.exports=encryptPassword;