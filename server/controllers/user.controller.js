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

    if(deleteWishlist.Wishlist.length > 0){
      res.json(deleteWishlist)
    }
    else{
      res.json(null)
    }
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
    if(!getwishlist) return next(errorHandler(400,"There is not product in database"))
    
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

    if(wishlist.length >0){
      res.status(200).json(wishlist)
    }
    else{
      res.json(null)
    }
   
  } catch (error) {
    next(error)
  }
}


async function AddCartProduct(req,res,next){
  const {userid,productId,ProductSize} = req.params;

  try {
    const existProductCheck = await User.findById(userid);
    if(!existProductCheck) return next(errorHandler(500,"Occurse error"))

    const existProductIncart = existProductCheck.Cart;
    let checkingflag = null;
  
    if(existProductIncart.length !==0){
      for(let i =0; i< existProductIncart.length ; i++){
        if(existProductIncart[i].id === productId &&existProductIncart[i].size === ProductSize ){
          checkingflag = false;
          break;
        }
        else if(existProductIncart[i].id === productId && existProductIncart[i].size !== ProductSize ){
         checkingflag = null;
        
         existProductIncart[i].size = ProductSize;
         existProductIncart[i].Quantity = 1;
      
         const findUser = await User.findOneAndUpdate({_id:userid},{
          $set:{
            Cart:existProductIncart
          },
        },{new:true});


        
        if(!findUser) return next(errorHandler(500,"Occurse error"))
        
        console.log(existProductIncart);
        res.status(200).json({message:"Product added in cart"})
        break;
        }
        else{
          checkingflag = true;
        }
      }

    }
    else{
      checkingflag = true;
    }




    if(checkingflag !== null){
      if(checkingflag === true ){
        const findUser = await User.findByIdAndUpdate(userid,{
            $push: {
            Cart:{id:productId , size:ProductSize,Quantity:1}
          }
        },{new:true});
      
          if(!findUser) return next(errorHandler(500,"Occurse error"))
          
          res.status(200).json({message:"Product added in cart"})
        }
        else{
          res.json({message:"Product already in cart"})
        }
    }

    
  } catch (error) {
    next(error)
  }
}

async function GetCartProduct(req,res,next){
  const {userid} = req.params;
  try {
    const findUser = await User.findById(userid);
    if(!findUser) return next(errorHandler(500,"Occurse error"));

    const cartProductsId = findUser.Cart;
    const cartProduct =[];
    const Products = await Product.find({});
    if(!Products) return next(errorHandler(500,"Occurse error"));
    
    for(let i in cartProductsId){
      for(let j in Products){
        if(cartProductsId[i].id === Products[j]._id.toString()){
          let cartProductDetails = {}; 
          
          cartProductDetails._id = Products[j]._id;
          cartProductDetails.title = Products[j].title;
          cartProductDetails.companyname = Products[j].companyname;
          cartProductDetails.regualarPrice = Products[j].regualarPrice;
          cartProductDetails.discountPrice = Products[j].discountPrice;
          cartProductDetails.posterimage = Products[j].posterimage;
          cartProductDetails.productQuantity = cartProductsId[i].Quantity;
          cartProductDetails.sizes = cartProductsId[i].size
          if(Products[j].productVarious.ProductType === "Electronic"){
            cartProductDetails.deviceName = Products[j].productVarious.deviceName;
          }
          else{
            cartProductDetails.brand = Products[j].brand;
          }

          cartProduct.push(cartProductDetails)
        }
        else{
          continue;
        }
      }
    }

    res.status(200).json(cartProduct);
  } catch (error) {
    next(error)
  }
}


async function DeleteCartProduct(req,res,next){
  const {userid, productId} = req.params;

  try {
    const findUser = await User.findById(userid);
    if(!findUser) return next(errorHandler(500,"Occurse error"));

    let flag = null;
    const userCart = findUser.Cart;
    
    for(let i =0; i<userCart.length; i++){
      if(userCart[i].id === productId){
        flag= true
        userCart.splice(i,1);
        break
      }
      else{
        flag = false
        continue;
      }
    }

    if(flag ===true){
      const updateUser = await User.findByIdAndUpdate(findUser._id,{ $set:{
        Cart:userCart,
      }},{new:true})

      res.status(200).json({message:"Product deleted in cart"})
    }
    else{
      next(errorHandler(500,"Occurse error"));
    }

  } catch (error) {
    next(error);
  }
}

async function BuyProduct(req,res,next){
  const {userid,productId,productSize,productQuantities} = req.params;
  
  try {
    const findUser = await User.findByIdAndUpdate(userid,{$push:{
      Order:{ProductId:productId,productsize:productSize ,quantity:productQuantities},
    }}, {new:true,timestamps:true});


    if(!findUser) return next(errorHandler(500,"Occurse error"));

    const findProduct = await Product.findById(productId);

    if(!findProduct) return next(errorHandler(500,"Occurse error"));
    const clotheProductSizes = findProduct.productVarious.sizes;
    const ElectronicProductStorage = findProduct.productVarious.storage;
    const ProductSizes = clotheProductSizes ? clotheProductSizes : ElectronicProductStorage;
     
    const DecreaseQuantity = productQuantities  ? 1 : productQuantities;
    ProductSizes[productSize] = String(Number(ProductSizes[productSize])-Number(DecreaseQuantity));

    let UpdateProducttotalQuantity = 0;

   
    for(let j in ProductSizes){
     UpdateProducttotalQuantity += Number(ProductSizes[j])
    }



    const UpdataProductData  = await Product.findByIdAndUpdate(findProduct._id,{
      $set:{
        productVarious:findProduct.productVarious,
        quantity:UpdateProducttotalQuantity,
      },
      $push:{
        Orders:{customerId:findUser._id,OrderSize:productSize, Orderquantites:DecreaseQuantity}
      }
    },{new:true})
   
    res.json({message:"Order successfull"});
    
  } catch (error) {
    next(error);
  }
}

async function GetBuyProduct(req,res,next){
  const {userid} = req.params;

  try {
    const findUser = await User.findById(userid);
    if(!findUser) return next(errorHandler(403,'You are not authented'))

    const UserOrderProduct = findUser.Order;
    const Orders = [];
    const Allproducts = await Product.find({});
    if(!Allproducts) return next(errorHandler(500,"Occurse error"))

    for(let i =0; i<UserOrderProduct.length ; i++){
      for(let j =0 ; j<Allproducts.length; j++){
        if(UserOrderProduct[i].ProductId === Allproducts[j]._id.toString()){
          let obj = {};
          obj._id = Allproducts[j]._id;
          obj.title = Allproducts[j].title;
          obj.regualarPrice = Allproducts[j].regualarPrice;
          obj.posterimage = Allproducts[j].posterimage;
          obj.discountPrice = Allproducts[j].discountPrice

          Orders.push(obj);
        }
      }
    }

    if(Orders.length ===0){
      res.json({message:"no found orders"});
    }
    else{
      res.status(200).json(Orders)
    }
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
    GetwishListProduct,
    AddCartProduct,
    GetCartProduct,
    DeleteCartProduct,
    BuyProduct,
    GetBuyProduct
}