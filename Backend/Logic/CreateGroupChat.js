const Asynchandler = require("express-async-handler")
const Chat = require("../schema/chatschema")

const CreateGroupChat = Asynchandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" })
    }
    var users = JSON.parse(req.body.users)
    if (users.length < 2) {
        return res.status(400).send({ message: "More than 2 users are required to form a group chat" })
    }
    users.push(req.user)
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })
        const fullGroupChat = await Chat.findOne({ _id: groupChat.id })
            .populate("users", "-password -confirmPassword")
            .populate("groupAdmin", "-password -confirmPassword")
        res.status(200).json(fullGroupChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }    
})
module.exports = CreateGroupChat