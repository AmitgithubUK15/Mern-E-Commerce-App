const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    companyname:{
        type:String,
        required:true
    },
    regualarPrice:{
        type:Number,
        required:true,
    },
    discountPrice:{
        type:Number,
        required:true,
    },
    productVarious:{
        type:Object,
        required:true,
    },
    posterimage:{
       type:Array,
        required:true,
    },
    coverimage:{
        type:Array,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    sellerRef:{
        type:String,
        required:true,
    },
    quantity:{
    type:Number,
    required:true
    },
    offer:{
        type:Boolean,
    },
    stock:{
        type:Boolean,
    },
    title:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
    },
    Orders:{
        type:Array,
    }
},{timestamps:true});

const Product = mongoose.model('product',ProductSchema);

module.exports = Product;