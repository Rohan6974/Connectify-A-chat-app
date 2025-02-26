const express = require("express");
const {Protect} = require("../Middleware/AuthorizeMiddleware")
const sendMessage = require("../Logic/sendMessage");
const getMessages = require("../Logic/getMessage");

const router = express.Router()

router.post(("/"),Protect,sendMessage)
router.get(("/:chatId"),Protect,getMessages)

module.exports = router