const mongoose = require("mongoose");

const MesssageSchema = new mongoose.Schema(
    {
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
        ,
        content: {
            type: String,
            trim: true,
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
        },
    }
);

const Message = mongoose.model("Message", MesssageSchema);
module.exports = Message 
