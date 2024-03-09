const User = require("../models/user.model.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setUser } = require("../utils/verifyUser.js");


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

async function LoginUser(req,res,next){
  const {email,password} = req.body;
  
  try {
    const validUser = await User.findOne({email});
    if(!validUser) throw Error("Invalid user");
    const validPassword = await bcrypt.compare(password,validUser.password);
    if(!validPassword) throw Error("Invalid password");
    
    const token = jwt.sign({id:validUser._id},process.env.JWT_PASS_KEY);
    
    const {password:pass, ...rest} = validUser._doc;
    
    res.cookie('token',token,{httpOnly:true}).status(200).json(rest);
       
  } catch (error) {
     next(error);
  }
}

async function google(req,res){
  try {
    const user = await User.findOne({email:req.body.email});
    if(user){
      const token = setUser(user)
      const {password:pass,...rest} = user._doc;
      
      res
      .cookie(
        'token',
        token
      )
      .status(200)
      .json(rest);
    }
    else{
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedpassword = await bcrypt.hashSync(generatePassword,8);
      const phone = Math.round(Math.random()*10000000000-1);
      const name = req.body.name.split(" ").join("") + Math.round(Math.random() * 10000-1);
      const newUser = new User({username:name,email:req.body.email,phone:phone,password:hashedpassword,avatar:req.body.photo});
      
      await newUser.save();
      const token = setUser(newUser)
      const {password:pass,...rest} = newUser._doc;
      
      res.cookie(
        'token',
        token
      )
      .status(201)
      .json(rest)
    }
  } catch (error) {
     next(error);
  }
}

async function signout(req,res,next){
  try{
    res.clearCookie('token');
    res.json({msg:"signout user"})
  }
  catch(error){
    next(error);
  }
}

module.exports = {
    SignupUser,
    LoginUser,
    google,
    signout,
  }

