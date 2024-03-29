const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://thumbs.dreamstime.com/b/user-profile-my-account-avatar-login-icon-man-male-face-smile-symbol-flat-vector-human-person-member-sign-user-profile-182815734.jpg",
    },
    address:{
        type:String,
    },
   dob:{
    type:String,
   },
   gender:{
    type:String,
   },
   vendor:{
    type:String,
   },
   Wishlist:{
    type:Array,
   },
   Cart:{
    type:Array,
   },
   Order:{
    type:Array,
   }
},{timestamps:true});


const User = mongoose.model('user',userSchema);

module.exports = User;