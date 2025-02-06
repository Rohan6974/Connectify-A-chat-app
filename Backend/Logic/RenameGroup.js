const Asynchandler = require("express-async-handler")
const Chat = require("../schema/chatschema")

const RenameGroup = Asynchandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId,{
            chatName: chatName,
            new: true,
        },
    ).populate("users", "-password -confirmPassword").populate("groupAdmin", "-password -confirmPassword");
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
})

module.exports = RenameGroup