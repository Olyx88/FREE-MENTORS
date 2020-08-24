const bcrypt=require("bcrypt");
const comparePassword = (plainPwd, hashedPwd) => bcrypt.compareSync(plainPwd, hashedPwd);

//export default comparePassword;
module.exports = comparePassword; 