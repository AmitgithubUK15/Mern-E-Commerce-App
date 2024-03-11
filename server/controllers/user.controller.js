const Seller = require("../models/seller.model.js");
const User = require("../models/user.model.js");
const { errorHandler } = require("../utils/error")
const bcrypt = require("bcrypt")
const shortid = require('shortid');

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

async function createVendorKey(req,res,next){
  let existuser = await User.findById(req.params.id);
  let existSeller = await Seller.findOne({email:existuser.email});
  if(existSeller) return next(errorHandler(500,"Already have a Vendor account Not generate Vendor key"))

  try {
    let user = await User.findById(req.params.id);
    let PasswordCheck = await bcrypt.compare(req.body.password , user.password);
    if(!PasswordCheck) return next(errorHandler(401,"Invalid Password"));
    let key = shortid.generate();
    let update=  await User.findOneAndUpdate(user._id,{$set:{vendor:key}})
    res.json(key);

  } catch (error) {
    next(error);
  }
}

module.exports = {
    testapi,
    updateuser,
    createVendorKey,
}