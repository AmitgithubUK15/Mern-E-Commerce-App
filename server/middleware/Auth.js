
const { errorHandler } = require("../utils/error");
const { getUser } = require("../utils/verifyUser");

async function restrictToLoggedinUserOnly(req,res,next){
    const token = req.cookies.token;

    if(!token) return next(errorHandler(401, "Auth failed please Login"))
    const user = getUser(token);

    if(!user) return next(errorHandler(401,"Auth failed please Login again"))

    req.user = user;

    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
}