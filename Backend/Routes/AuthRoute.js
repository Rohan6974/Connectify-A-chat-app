const express = require("express");
const AuthUser = require("../Logic/Authuser")
const router = express.Router()


router.route("/").post(AuthUser)
module.exports = router