const { authentication, restrictTo } = require("../controller/auth.controller");
const { getAllUser } = require("../controller/user.controller");
const catchAsync = require("../utils/catchAsync");

const router = require("express").Router();

// Wrap the `getAllUser` function with `catchAsync` for error handling
router.route("/").get(authentication, catchAsync(getAllUser));

module.exports = router;
