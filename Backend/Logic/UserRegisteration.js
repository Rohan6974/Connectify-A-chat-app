const Asynchandler = require("express-async-handler")
const User = require("../schema/Userschema")
const TOKEN = require("../TOKEN")


const UserRegisteration = Asynchandler(async (req,res)=>{
    const {name, email, password, confirmPassword} = req.body
    if(!name || !email || !password || !confirmPassword){
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    if(password != confirmPassword){
        throw new Error("Passwords do not match")
    }
    console.log(req.body)
    const UserExists = await User.findOne({email})

    if(UserExists){
        pic = UserExists.pic
        res.status(400)
        throw new Error("User already exists")
    }
    const user = await User.create({
        name,
        email,
        password,
        confirmPassword,

    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            password: user.password,
            confirmPassword: user.confirmPassword,
            token:TOKEN(user._id)
        })
               console.log(user)
    }else{
        res.status(400)
        throw new Error("User Not Created")
    }

})




module.exports = {UserRegisteration}