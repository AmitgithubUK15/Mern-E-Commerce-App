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
        .cookie('token',token,{httpOnly:true,
          secure:true,
          sameSite:'none'
        })
        .json(rest);

        
    } catch (error) {
        next(error)
    }
}


async function getProductList(req,res,next){
  const {id} = req.params;

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
    const {prodcutId,sellerId} = req.params;

    try {
        const findProduct = await Product.findOneAndDelete({_id:prodcutId});
        if(!findProduct) return next(errorHandler(500,"Product no found"))

        const findSeller = await Product.find({sellerRef:sellerId});
        if(!findSeller) return next(errorHandler(500,"Login again"));


        res.status(200).json({msg:"Delete product",findSeller});
    } catch (error) {
        next(error);
    }
}

async function GetTotalVisitor(req,res,next){
  const {sellerId} = req.params;
  try {
    const findVisitor = await Seller.findById(  sellerId);
    if(!findVisitor) return next(errorHandler(500,"Server issue 1"))
    
    const visitorCount = findVisitor.productVistors.length;
    res.status(200).json(visitorCount);
  } catch (error) {
    next(error);
  }
}

async function GetTotalOrders(req,res,next){
  const {sellerId} = req.params;

  try {
    const findSellerOrder = await Product.find({sellerRef:sellerId});
    if(!findSellerOrder) return next(errorHandler(500,"Server issue"));

    const filterProduct = findSellerOrder.filter((item) => item.Orders.length >0);
    
    let TotalCountOFOrders = 0;
    let TotalSales = 0;
    for(let i in filterProduct){
      TotalCountOFOrders += filterProduct[i].Orders.length;
      TotalSales += TotalCountOFOrders * filterProduct[i].regualarPrice;
    }
    
    res.status(200).json({allOrders:TotalCountOFOrders,allSales:TotalSales});
  } catch (error) {
    next(error)
  }
}

async function GetVisitorsByProduct(req,res,next){
  const {sellerId} = req.params;

  try {
    const findSeller_Items = await Product.find({sellerRef:sellerId});
    if(!findSeller_Items) return next(errorHandler(500,'server issue'));

    const filterByVisitors = findSeller_Items.filter((item)=> item.viewer.length> 0)

    let Visyitors_DataArray = [];

    for(let i in filterByVisitors){
      let obj = {
        poster:filterByVisitors[i].posterimage,
        name:filterByVisitors[i].title,
        visitors:filterByVisitors[i].viewer.length
      }

      Visyitors_DataArray.push(obj);
    }

    res.status(200).json(Visyitors_DataArray);

  } catch (error) {
    next(error)
  }
}



module.exports = {
    CreateSellerAccount,
    loginVendor,
    getProductList,
    ProductDelete,
    GetTotalVisitor,
    GetTotalOrders,
    GetVisitorsByProduct,
}