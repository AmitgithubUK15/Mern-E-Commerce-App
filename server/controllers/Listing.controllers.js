const Product = require("../models/ProductListing.model.js")


async function Addproduct(req,res,next){
    try {
        const listing = await Product.create(req.body);
        return res.status(201).json({msg:"Product create successfully"});
    } catch (error) {
        next(error)
    }
}

module.exports ={
    Addproduct,
}