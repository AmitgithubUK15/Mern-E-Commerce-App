const jwt = require("jsonwebtoken")
const { errorHandler } = require("./error")

function setUser(user){
  return jwt.sign({
    id:user._id
  },process.env.JWT_PASS_KEY)
}

function getUser(token,next){
  if(!token) return next(errorHandler(401,"Please Login first"))
  try {
    return jwt.verify(token,process.env.JWT_PASS_KEY)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  setUser,
  getUser,
}