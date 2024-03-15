const User = require("../models/user.model.js");
const Seller = require("../models/seller.model.js");
const Product = require("../models/ProductListing.model.js");
const { errorHandler } = require("../utils/error.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { setUser } = require("../utils/verifyUser.js");


async function CreateSellerAccount(req,res,next){
    try {
        const validuser = await User.findOne({email:req.body.email});
        if(!validuser) return next(errorHandler(400,"Invalid email"))

        if(validuser.vendor !== req.body.vendor){
            return next(errorHandler(422,"Vendor Key Invalid"));            
        } 

        const hashedpassword =  bcrypt.hashSync(req.body.password,6);
        
        const SellerUser = await Seller.create({
                sellername:req.body.sellername,
                company:req.body.company,
                email:req.body.email,
                vendor:req.body.vendor,
                address:req.body.address,
                password:hashedpassword,
            })
        
          const {password:pass,...rest} = SellerUser._doc;  
        return res.json(rest)    
    } catch (error) {
        res.json(error)
    }
}

async function loginVendor(req,res,next){
    const {email,password} = req.body;
    try {
        const vailidEmail = await Seller.findOne({email});
        if(!vailidEmail) return next(errorHandler(400,"Invalid Email"));

        const vailidPassword =bcrypt.compareSync(password,vailidEmail.password);
        if(!vailidPassword) return next(errorHandler(400,"Invalid password"))
        
        const {password:pass,...rest} = vailidEmail._doc;
        const token = setUser(rest)
        
        res
        .cookie('token',token,{httpOnly:true})
        .json(rest);

        
    } catch (error) {
        next(error)
    }
}


async function getProductList(req,res,next){
  const {id} = req.params;
 console.log(id);
  try {
    let arr = [];
    const findUserlistingProdcut = await Product.find({sellerRef:id});
    if(findUserlistingProdcut.length ===0) return next(errorHandler(404,'No product found'))

    res.status(200).json(findUserlistingProdcut);
  } catch (error) {
    next(error)
  }
}

async function ProductDelete(req,res,next){
    const {productId} = req.params;
    
    try {
        const findProduct = await Product.findOneAndDelete({productId});
        if(!findProduct) return next(errorHandler(500,"Login again"))

        res.status(200).json({msg:"Delete product"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    CreateSellerAccount,
    loginVendor,
    getProductList,
    ProductDelete,
}