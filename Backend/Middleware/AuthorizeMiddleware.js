const jwt = require("jsonwebtoken")
const User = require("../schema/Userschema")
const asynchandler = require("express-async-handler")

const Protect = asynchandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
     let token = req.headers.authorization.split(" ")[1] 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password")
      next()
     
    } catch (error) {
      res.status(401)
      throw new Error("Not Authorized, Token Failed")
    }
  }
})

module.exports = {Protect}