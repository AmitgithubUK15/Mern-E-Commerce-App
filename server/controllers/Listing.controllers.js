const Product = require("../models/ProductListing.model.js");
const Seller = require("../models/seller.model.js");

const { errorHandler } = require("../utils/error.js");




async function Addproduct(req, res, next) {
    try {
        const listing = await Product.create(req.body);
        return res.status(201).json({ msg: "Product create successfully" });
    } catch (error) {
        next(error)
    }
}

async function UpdateClothingProduct(req, res, next) {

    let Allsizes = req.body.productVarious.sizes;

    let AllQuantity = 0;
    for (let i in Allsizes) {
        AllQuantity += Number(Allsizes[i]);
    }


    try {

        const findProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: {
                regualarPrice: req.body.regualarPrice,
                discountPrice: req.body.discountPrice,
                quantity: AllQuantity,
                productVarious: req.body.productVarious,
                posterimage:req.body.posterimage,
                coverimage:req.body.coverimage,
            }
        }, { new: true });
        if (!findProduct) return next(errorHandler(403, "Not found Product"));

        const findAll = await Product.find({ sellerRef: req.params.sellerId })
        res.status(200).json(findAll);
    } catch (error) {
        next(error);
    }
}

async function DeleteClothingProduct(req, res, next) {
    try {
        const findProduct = await Product.findByIdAndDelete(req.params.id);
        if (!findProduct) return next(errorHandler(403, "Not found prodcut"))

        const Allprodcut = await Product.find({ sellerRef: req.params.sellerId });
        if (!Allprodcut) return next(errorHandler(500, "Server issue"));

        res.status(200).json(Allprodcut);
    } catch (error) {
        next(error);
    }
}

async function getClothingProduct(req, res, next) {
    try {
        const product = await Product.find({});
        if (!product) return next(errorHandler(400, "Not found product"));

        res.json(product);
    } catch (error) {
        next(error)
    }
}

async function getSingleProduct(req, res, next) {
    const { productId } = req.params;
    try {
        const findProduct = await Product.findById(productId);
        if (!findProduct) return next(errorHandler(400, "Occurse error"))

        res.status(200).json(findProduct);
    } catch (error) {
        next(error)
    }
}

async function getRelatedProducts(req,res,next){
    const {productType} = req.params;
    console.log(productType);
    try {
        if(productType === 'T-Shirt' || productType === 'Jeans' || productType === 'Hoodie'){
            const findAllrelated = await Product.find({
                [`productVarious.ClotheType`]:productType,
            })
            if(!findAllrelated) return next(errorHandler(500,"Not found"));
            res.status(200).json(findAllrelated);
        }
        else{
            const findAllrelated = await Product.find({
             [`productVarious.DeviceType`]:productType,
            })
            if(!findAllrelated) return next(errorHandler(500,"Not found"));
            res.status(200).json(findAllrelated);
        }
 
        

        
    } catch (error) {
        next(error);
    }
}


async function GetSearchResult(req, res, next) {

    try {
        const limit = parseInt(req.query.limit) || Infinity;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let genders = req.query.gender;

        if (genders === undefined || genders === 'all'|| genders === "") {
            genders = ['Female','Male' ];
        }

        let deviceName = req.query.namedevice || "";
     
        const minPrice = parseInt(req.query.minPrice) || 0;
        const maxPrice = parseInt(req.query.maxPrice) || Infinity;

        let flag = null;
        let mobileflag = false;
        
        const searchTerm = req.query.searchTerm || "";
      
        let lowercaseSearchTerm = searchTerm.toLowerCase();

        if (lowercaseSearchTerm === 'phone' ||lowercaseSearchTerm === 'phones' || lowercaseSearchTerm === 'mobiles'|| lowercaseSearchTerm === 'mobile') {

            mobileflag = true;
        }

        if (lowercaseSearchTerm === "moto" || lowercaseSearchTerm === "apple" || lowercaseSearchTerm === "samsung" || lowercaseSearchTerm === "redmi" || lowercaseSearchTerm === "oppo" || lowercaseSearchTerm === "vivo" || lowercaseSearchTerm === "oneplus") {
            flag = true;
        }
        else {
            flag = false;
        }



        if (mobileflag === true) {

            const products = await Product.find({
                [`productVarious.DeviceType`]: { $regex: "Mobile", $options: 'i' },
                [`productVarious.deviceName`]:{ $regex: deviceName, $options: 'i' },
                regualarPrice: { $gte: minPrice, $lte: maxPrice },
            }).limit(limit).skip(startIndex);

            if(!products) return next(errorHandler(500,"No prodcut found"))

            res.status(200).json(products);
        }
        else{
            if (flag === true) {
                const products = await Product.find({
                    [`productVarious.ModelName`]: { $regex: lowercaseSearchTerm, $options: 'i' },
                    // [`productVarious.deviceName`]:deviceName,
                    regualarPrice: { $gte: minPrice, $lte: maxPrice },
                }).limit(limit).skip(startIndex);
                if(!products) return next(errorHandler(500,"No prodcut found"))
                res.status(200).json(products);
            }
    
            else if (flag === false) {
                const products = await Product.find({
                    title: { $regex: searchTerm, $options: 'i' },
                    [`productVarious.genders`]: genders,
                    regualarPrice: { $gte: minPrice, $lte: maxPrice },
                }).limit(limit).skip(startIndex);
                if(!products) return next(errorHandler(500,"No prodcut found"))
                res.status(200).json(products);
            }
        }


     

    } catch (error) {
        next(error);
    }
}


async function GetExploreProduct(req,res,next){
    try {
        const limit = parseInt(req.query.limit) || Infinity;
        const startIndex = parseInt(req.query.startindex) || 0;
        
        let category = req.query.productcategory|| null ;

        if(category === undefined || category === 'all'){
            category =['Electronic','Clothes']
        }

      

        let deviceType = req.query.devicetype;

        if(deviceType === undefined || deviceType === 'all'){
            deviceType=["Mobile","Laptop"]
        }


        let ClothesCategory = req.query.clothescategory;
       

        if(ClothesCategory === undefined || ClothesCategory === 'all' || ClothesCategory === ""){
            ClothesCategory=['T-Shirt','Jeans']
        }


        let MobileCategory = req.query.mobilecategory;
        

        if(MobileCategory === undefined || MobileCategory === 'all'){
           MobileCategory = ["Apple","Iphone","Samsung","Oppo","Redmi","Realme","Vivo","Poco","Infinix","Oneplus"]
        }

        let genders = req.query.genders;
  
        if (genders === undefined || genders === 'all') {
            genders = ['Female','Male' ];
        }

        
        const minPrice = parseInt(req.query.minPrice) || 0;
        const maxPrice = parseInt(req.query.maxPrice) || Infinity;

         

        if(category === null ||category === undefined){
            const Result = await Product.find({})
        
                if(!Result) return next(errorHandler(400,"Product not found"))
        
                res.json(Result);
        }
        else{
          if(category === "Electronic"  ){
            const Result = await Product.find({
              
                [`productVarious.ProductType`]:category,
                // [`productVarious.DeviceType`]:deviceType,
                [`productVarious.deviceName`]:{$regex:MobileCategory,$options:'i'},    
                regualarPrice: { $gte: minPrice, $lte: maxPrice },
                }).limit(limit).skip(startIndex);
        
                if(!Result) return next(errorHandler(400,"Product not found"))
        
                res.json(Result);
          }
          else{
            const Result = await Product.find({
                [`productVarious.ProductType`]:category,
                [`productVarious.ClotheType`]:ClothesCategory,
                [`productVarious.genders`]: genders,
                regualarPrice:{$gte:minPrice, $lte:maxPrice}
                }).limit(limit).skip(startIndex);
        
                if(!Result) return next(errorHandler(400,"Product not found"))
        
                res.json(Result);
          }
        }

    } catch (error) {
        next(error);
    }
}

async function GetProductViewers(req,res,next){
   const {customerId,productId,sellerId} = req.body
   console.log(customerId,productId);
   try {
    if(!customerId && !productId && !sellerId){
        res.json({msg:"not saved"})
    }
    else{
        let findProduct = await Product.findByIdAndUpdate(productId,{
            $push:{
             viewer:{customer:customerId}
            }
         },{new:true})
         if(!findProduct) return next(errorHandler(400,"Product not find"));

         let Update_in_Seller = await Seller.findByIdAndUpdate(sellerId,{
            $push:{
                productVistors:{viewer:customerId}
            }
         },{new:true})

     
         res.status(200).json({msg:"saved"});
    }
   } catch (error) {
     next(error)
   }
}


module.exports = {
    Addproduct,
    UpdateClothingProduct,
    DeleteClothingProduct,
    getClothingProduct,
    getSingleProduct,
    GetSearchResult,
    GetExploreProduct,
    getRelatedProducts,
    GetProductViewers
}