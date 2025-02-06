const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./Database");
const UserRoute = require("./Routes/UserRoute");
const Cors = require("cors");
const {ErrorHandler,NotFoundHandler} = require("./Middleware/ErrorMiddleware")
const AuthRoute = require("./Routes/AuthRoute")
const ChatsRoutes = require("./Routes/ChatsRoutes");
const { Protect } = require("./Middleware/AuthorizeMiddleware");

connectDatabase

const app = express();
app.use(express.json())
dotenv.config()
app.use(Cors())

app.use("/user", UserRoute)
app.use("/auth", AuthRoute)
app.use("/chats" ,ChatsRoutes)

app.use(NotFoundHandler)
app.use(ErrorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("http://localhost:" + PORT)
})