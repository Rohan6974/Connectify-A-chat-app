const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./Database");
const UserRoute = require("./Routes/UserRoute");
const Cors = require("cors");
const {ErrorHandler,NotFoundHandler} = require("./Middleware/ErrorMiddleware")
const AuthRoute = require("./Routes/AuthRoute")
const ChatsRoutes = require("./Routes/ChatsRoutes");
const MessageRoutes = require("./Routes/MessageRoutes");

connectDatabase

const app = express();
app.use(express.json())
dotenv.config()
app.use(Cors())


app.use("/user", UserRoute)
app.use("/auth", AuthRoute)
app.use("/chats" ,ChatsRoutes)
app.use("/messages" ,MessageRoutes)

app.use(NotFoundHandler)
app.use(ErrorHandler)

const PORT = process.env.PORT




const server = app.listen(PORT, () => {
    console.log("http://localhost:" + PORT)
})

const io = require("socket.io")(server, {
    pingTimeout: 90000,
    cors: {
      origin: "http://localhost:3000",
    },
  });
  

  io.on("connection", (socket) => {

    socket.on("setup", (user) => {
      socket.join(user._id);
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));



    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;

      if (!chat.users) return console.log("chat.users not defined");

      chat.users.forEach(user => {
        if (user._id == newMessageRecieved.sender._id) return;

        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  })