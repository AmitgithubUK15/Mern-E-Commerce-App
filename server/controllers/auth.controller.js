const User = require("../models/user.model.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function SignupUser(req,res,next){
  const {username,email,phone,password} = req.body;
  const hashedpassword = await bcrypt.hash(password,8);
  
    const user = await User({
        username,email,phone,password:hashedpassword
      })

  try {
    await user.save();
    console.log(user);
    return res.status(200).json({msg:"Created successfully"})
  } catch (error) {
     next(error);
  } 
}

async function LoginUser(req,res){
  const {email,password} = req.body;
  
  try {
    const validUser = await User.findOne({email});
    if(!validUser) throw Error("Invalid user");
    const validPassword = await bcrypt.compare(password,validUser.password);
    if(!validPassword) throw Error("Invalid password");
    
    const token = jwt.sign({id:validUser._id},process.env.JWT_PASS_KEY);
    
    const {password:pass, ...rest} = validUser._doc;
    
    res.cookie('access-token',token,{httpOnly:true}).status(200).json(rest);
       
  } catch (error) {
     return next(error);
  }
}


module.exports = {
    SignupUser,
    LoginUser,
}

