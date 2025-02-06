const asynchandler = require('express-async-handler')
const Chat = require('../schema/chatschema')

const AddToGroup = asynchandler(async (req, res) => {
    const {chatId, userId} = req.body

    const added = await Chat.findByIdAndUpdate(chatId, {
        $push: {users: userId},
    }, {new: true}).populate("users", "-password -confirmPassword").populate("groupAdmin", "-password -confirmPassword")

    if (!added) {
        res.status(404)
        throw new Error("chat not found")
    } else {
        res.json(added)
    }
})

module.exports = AddToGroup