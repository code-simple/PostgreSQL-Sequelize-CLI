const { signup, login } = require("../controller/authController");
const catchAsync = require("../utils/catchAsync");

const router = require("express").Router();

// Wrap the controller functions with `catchAsync` for error handling
router.route("/signup").post(catchAsync(signup));
router.route("/login").post(catchAsync(login));

module.exports = router;
