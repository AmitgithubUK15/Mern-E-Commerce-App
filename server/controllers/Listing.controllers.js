const Product = require("../models/ProductListing.model.js");

const { errorHandler } = require("../utils/error.js");




async function Addproduct(req,res,next){
    try {
        const listing = await Product.create(req.body);
        return res.status(201).json({msg:"Product create successfully"});
    } catch (error) {
        next(error)
    }
}

async function UpdateClothingProduct(req,res,next){

    let Allsizes = req.body.productVarious.sizes;
    
    let AllQuantity = 0;
    for(let i in Allsizes){
        AllQuantity += Number(Allsizes[i]);
    }


    try {

        const findProduct = await Product.findByIdAndUpdate(req.params.id, {$set:{
            regualarPrice: req.body.regualarPrice,
	        discountPrice: req.body.discountPrice,
            quantity:AllQuantity,
            productVarious: req.body.productVarious,
        }},{new:true});
        if(!findProduct) return next(errorHandler(403,"Not found Product"));

        const findAll = await Product.find({sellerRef:req.params.sellerId})
        res.status(200).json(findAll);
    } catch (error) {
        next(error);
    }
}

async function DeleteClothingProduct(req,res,next){
    try {
        const findProduct = await Product.findByIdAndDelete(req.params.id);
        if(!findProduct) return next(errorHandler(403,"Not found prodcut"))

        const Allprodcut = await Product.find({sellerRef:req.params.sellerId});
        if(!Allprodcut) return next(errorHandler(500,"Server issue"));

        res.status(200).json(Allprodcut);
    } catch (error) {
        next(error);
    }
}

async function getClothingProduct(req,res,next){
    try {
        const product = await Product.find({});
        if(!product) return next(errorHandler(400,"Not found product"));

        res.json(product);
    } catch (error) {
        next(error)
    }
}

async function getSingleProduct(req,res,next){
    const {productId} = req.params;
    try {
        const findProduct = await Product.findById(productId);
        if(!findProduct) return next(errorHandler(400,"Occurse error"))

        res.status(200).json(findProduct);
    } catch (error) {
        next(error)
    }
}


async function GetSearchResult(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
  
      let genders = req.query.gender;
  
      if (genders === undefined || genders === 'all') {
        genders = ['Male', 'Female'];
      }
  
      let regualarPrice = req.query.price;

      const minPrice = req.query.minPrice || 0;
      const maxPrice = req.query.maxPrice || Infinity;

      const searchTerm = req.query.searchTerm || "";
  
      const products = await Product.find({
        title:{$regex:searchTerm,$options:'i'},
        [`productVarious.genders`]: genders,
        regualarPrice:{ $gte: minPrice, $lte: maxPrice },
      }).limit(limit).skip(startIndex);
  
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  



module.exports ={
    Addproduct,
    UpdateClothingProduct,
    DeleteClothingProduct,
    getClothingProduct,
    getSingleProduct,
    GetSearchResult
}