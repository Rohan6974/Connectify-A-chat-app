const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./Database");
const UserRoute = require("./Routes/UserRoute");
const Cors = require("cors");
const { ErrorHandler, NotFoundHandler } = require("./Middleware/ErrorMiddleware");
const AuthRoute = require("./Routes/AuthRoute");
const ChatsRoutes = require("./Routes/ChatsRoutes");
const MessageRoutes = require("./Routes/MessageRoutes");
const path = require("path");

dotenv.config();
connectDatabase

const app = express();
app.use(express.json());
app.use(Cors(
  {
    origin:"http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
));

app.use("/user", UserRoute);
app.use("/auth", AuthRoute);
app.use("/chats", ChatsRoutes);
app.use("/messages", MessageRoutes);

const PORT = process.env.PORT || 5000;

// ----------------------------------------------


const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running on http://localhost:3000");
  });
}




// ----------------------------------------------


// Error handlers must come after routes and deployment
app.use(NotFoundHandler);
app.use(ErrorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

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

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});
