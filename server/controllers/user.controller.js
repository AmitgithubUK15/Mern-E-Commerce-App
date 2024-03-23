const Product = require("../models/ProductListing.model.js");
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

async function updateVendor(req,res,next){
 

  try {
    if(req.body.password) {
        req.body.password = bcrypt.hash(req.body.password,8);
    }

    const findUser = await Seller.findByIdAndUpdate(req.params.id,{
        $set:{
            sellername:req.body.username,
            phone:req.body.phone,
            password:req.body.password,
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

async function AddwishListProduct(req,res,next){
   const {userid,productid} = req.params;
   try {
    //  check exist user or not
    const product = await Product.findById(productid);
    if(!product) return next(errorHandler(400,"Product not add wishlist"));

    const user = await User.findByIdAndUpdate(userid,{
      $push:{
        Wishlist:productid
      }
    },{new:true})

    if(!user) return next(errorHandler(400,"Please login again"))
   
    res.status(200).json({message:"Add successfully",user});

   } catch (error) {
    next(error)
   }
}

async function DeletewishListProduct(req,res,next){
  const {userid,productid} = req.params;

  try {
    const user = await User.findById(userid);
    if(!user) return next(errorHandler(400,"Not Delete product form wishlist"));

    const findIndexofWishlist = user.Wishlist;
    const newWishlist = [];
    for(let i=0; i<findIndexofWishlist.length; i++){
      if(findIndexofWishlist[i] === productid){
        findIndexofWishlist.splice(i,0)
      }
      else{
        newWishlist.push(findIndexofWishlist[i])
      }
    }
    
    const deleteWishlist = await User.findByIdAndUpdate(user._id,{
      $set:{
        Wishlist:newWishlist
      }
    },{new:true})

    res.json({message:"Delete successfully",deleteWishlist})
  } catch (error) {
    next(error)
  }
}

async function GetwishListProduct(req,res,next){
  const {userid} = req.params;
  try {
    const findUser = await User.findById(userid);
    if(!findUser) return next(errorHandler(400,"No user found please login again"))
   
    const getwishlist = await Product.find({});
    if(!getwishlist) return res.json(null)
    
    const userproduct = findUser.Wishlist;
    
    const wishlist = [];
    for(let i=0; i<userproduct.length; i++){
      for(let j =0; j<getwishlist.length ; j++){
        if(userproduct[i] === getwishlist[j]._id.toString()){
           wishlist.push(getwishlist[j])
        }
        else{
          continue;
        }
      }
    }

    res.status(200).json(wishlist)
   
  } catch (error) {
    next(error)
  }
}

module.exports = {  
    testapi,
    updateuser,
    createVendorKey,
    updateVendor,
    AddwishListProduct,
    DeletewishListProduct,
    GetwishListProduct
}