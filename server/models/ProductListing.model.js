const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    company:{
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
    posterImage:{
       type:String,
        required:true,
    },
    coverImage:{
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
    }
},{timestamps:true});

const Product = mongoose.model('product',ProductSchema);

module.exports = Product;