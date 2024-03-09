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
    }
})

const Seller = mongoose.model('seller',SellerSchema);

module.exports = Seller;