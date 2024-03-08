const User = require("../models/user.model.js");
const { errorHandler } = require("../utils/error")
const bcrypt = require("bcrypt")

async function testapi(req,res){
    const users = await User.find({});
    res.json(users)
};

async function updateuser(req,res,next){
 

  try {
    if(req.body.password) {
        req.body.password = bcrypt.hash(req.body.password,8);
    }

    const findUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            dob:req.body.dob,
            address:req.body.address,
            gender:req.body.gender,
        }
    },{new:true})

    const {password:pass,...rest} = findUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(errorHandler(401,'invalid token'))
  }
}

module.exports = {
    testapi,
    updateuser,
}