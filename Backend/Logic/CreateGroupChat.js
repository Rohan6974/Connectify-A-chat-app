const AsyncHandler = require("express-async-handler");
const Chat = require("../schema/chatschema");

const CreateGroupChatJs = AsyncHandler(async (req, res) => {
  console.log("Received Request Body:", req.body);

  // Check if the name and users exist
  if (!req.body.name || !req.body.users) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  let users;
  
  // Ensure users are correctly parsed
  try {
    users = typeof req.body.users === "string" ? JSON.parse(req.body.users) : req.body.users;
  } catch (error) {
    return res.status(400).json({ message: "Invalid users format" });
  }

  console.log("Parsed Users:", users);

  if (!Array.isArray(users) || users.length < 2) {
    return res.status(400).json({ message: "More than 2 users are required to form a group chat" });
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password -confirmPassword")
      .populate("groupAdmin", "-password -confirmPassword");

    console.log("Group Chat Created:", fullGroupChat);

    return res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error("Error creating group chat:", error);
    return res.status(400).json({ message: error.message });
  }
});

module.exports = CreateGroupChatJs;