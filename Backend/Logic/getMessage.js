const expressAsyncHandler = require("express-async-handler");
const Message = require("../schema/MessageSchema");

const getMessages = expressAsyncHandler(async(req,res)=>{
    if(!req.params.chatId){
        console.log("params not found")
        return res.sendStatus(404)
    }
    var messages = await Message.find({chat: req.params.chatId})
    .populate("sender", "name pic email")
    .populate("chat")
    .populate("chat.users" , "name pic email")

    res.status(200).send(messages)

})

module.exports = getMessages;