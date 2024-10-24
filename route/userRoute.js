const { authentication, restrictTo } = require("../controller/authController");
const { getAllUser } = require("../controller/userController");
const catchAsync = require("../utils/catchAsync");

const router = require("express").Router();

// Wrap the `getAllUser` function with `catchAsync` for error handling
router.route("/").get(authentication, catchAsync(getAllUser));

module.exports = router;
