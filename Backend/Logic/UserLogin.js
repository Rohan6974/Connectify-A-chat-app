const Asynchandler = require("express-async-handler");
const User = require("../schema/Userschema");
const TOKEN = require("../TOKEN");

const UserLogin = Asynchandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new error("Please fill all the fields");
  }

  const UserExsists = await User.findOne({ email })
  if(UserExsists){
    pic=UserExsists.pic
  }

  const user = await User.findOne({ email, password });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      pic: user.pic,
      token: TOKEN(user._id),
    });

    console.log(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
module.exports = UserLogin;
