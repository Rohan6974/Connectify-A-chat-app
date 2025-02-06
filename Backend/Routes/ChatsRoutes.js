const express = require('express')
const { Protect } = require('../Middleware/AuthorizeMiddleware')
const AccessChat = require('../Logic/AccessChat')
const FetchChats = require('../Logic/FetchChats')
const CreateGroupChat = require('../Logic/CreateGroupChat')
const RenameGroup = require('../Logic/RenameGroup')
const AddToGroup = require('../Logic/AddToGroup')
const RemoveFromGroup = require('../Logic/RemoveFromGroup')
const router  = express.Router()

router.route("/").post(Protect,AccessChat).get(Protect,FetchChats)
router.route("/group").post(Protect,CreateGroupChat)
router.route("/grouprename").put(Protect,RenameGroup)
router.route("/groupadd").put(Protect,AddToGroup)
router.route("/groupremove").put(Protect,RemoveFromGroup)

module.exports = router
