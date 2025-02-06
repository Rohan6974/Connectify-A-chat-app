const asynchandler = require('express-async-handler')
const Chat = require('../schema/chatschema')

const RemoveFromGroup = asynchandler(async (req, res) => {  
    const {chatId, userId} = req.body

    const removeTheUser = await Chat.findByIdAndUpdate(chatId, {
        $pull: {users: userId}, 
    }, {new: true})
    .populate("users", "-password -confirmPassword")
    .populate("groupAdmin", "-password -confirmPassword")

    if (!removeTheUser) {
        res.status(404)
        throw new Error("User not found")
    }
    else {
        res.json(removeTheUser)
    }
})

module.exports = RemoveFromGroup    