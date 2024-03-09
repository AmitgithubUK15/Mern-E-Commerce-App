const User = require("../models/user.model.js");
const Seller = require("../models/seller.model.js");
const { errorHandler } = require("../utils/error.js");
const bcrypt = require("bcrypt")

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

module.exports = {
    CreateSellerAccount,
}