const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
    sellername:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    vendor:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    type:{
       type:String,
       default:"Seller"
    },
    avatar:{
        type:String,
        default:"https://cdn1.iconfinder.com/data/icons/professional-avatar-14/130/professional-30-512.png"
    },
    phone:{
        type:String,
    },
    gender:{
        type:String,
    }
})

const Seller = mongoose.model('seller',SellerSchema);

module.exports = Seller;