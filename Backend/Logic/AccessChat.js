const asyncHandler = require("express-async-handler");
const Chat = require("../schema/chatschema");
const User = require("../schema/Userschema");

const AccessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request")
    return res.status(400).send("UserId is required")
  }

  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      users: { $all: [req.user.id, userId] },
    })
      .populate("users", "-password -confirmPassword")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name pic email",
        },
      });

    if (isChat.length > 0) {
      return res.send(isChat[0])
    }

    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId],
    };

    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id })
      .populate("users", "-password -confirmPassword")
      .populate("groupAdmin", "-password -confirmPassword")

    res.status(200).send(fullChat);
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message })
  }
});

module.exports = AccessChat;
