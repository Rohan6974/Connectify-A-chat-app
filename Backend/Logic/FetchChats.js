const asynchandler = require("express-async-handler")
const Chat = require("../schema/chatschema");
const User = require("../schema/Userschema");

const FetchChats = asynchandler(async (req, res) => {

    try {
        Chat.find({users: {$elemMatch: {$eq: req.user.id}}})
        .populate("users", "-password -confirmPassword")
        .populate("groupAdmin", "-password -confirmPassword")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then(async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email",
            });
            res.status(200).send(results)
        })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
module.exports = FetchChats