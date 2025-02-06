const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        confirmPassword: {
            type: String,
            required: true,
        },
        pic:{
            type: String,
            default:function(){
                const avatar = Math.floor(Math.random() * 10000)
                return `https://api.dicebear.com/6.x/avataaars/svg?seed=${avatar}`
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    
    
)

const User = mongoose.model("User", UserSchema);
module.exports = User