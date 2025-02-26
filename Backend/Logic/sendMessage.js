const expressAsyncHandler = require("express-async-handler");
const Message = require("../schema/MessageSchema");
const Chat = require("../schema/chatschema");
const User = require("../schema/Userschema");

const sendMessage = expressAsyncHandler(async(req,res)=>{
    const {content, chatId} = req.body
    if(!content || !chatId){
        console.log("Invalid data passed into request")
        return res.sendStatus(400)
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }

    try {
        var message = await Message.create(newMessage)

        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        })
        message = await message.populate("chat.latestMessage")

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        })

        res.status(200).send(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
        
})

module.exports = sendMessage