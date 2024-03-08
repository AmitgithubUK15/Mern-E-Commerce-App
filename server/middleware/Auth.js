
const { errorHandler } = require("../utils/error");
const { getUser } = require("../utils/verifyUser");

async function restrictToLoggedinUserOnly(req,res,next){
    const token = req.cookies.token;
    console.log(token);
    if(!token) return next(errorHandler(401, "Please Login again"))
    const user = getUser(token);

    if(!user) return next(errorHandler(401,"lease Login again"))

    req.user = user;

    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
}