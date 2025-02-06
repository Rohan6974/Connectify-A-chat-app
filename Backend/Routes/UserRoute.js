const Express = require("express")
const {UserRegisteration} = require("../Logic/UserRegisteration")
const UserLogin = require("../Logic/UserLogin")
const SearchApi = require("../Logic/SearchApi")
const {Protect} = require("../Middleware/AuthorizeMiddleware")


const router = Express.Router()

router.route("/").post(UserRegisteration).get(Protect,SearchApi)
router.route("/login").post(UserLogin);

module.exports = router;