const jwt = require("jsonwebtoken")

const TOKEN = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"60d"})
}

module.exports = TOKEN