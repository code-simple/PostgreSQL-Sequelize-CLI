const { signup, login } = require("../controller/auth.controller");
const catchAsync = require("../utils/catchAsync");
const { validateUser } = require("../validators/auth.validator");

const router = require("express").Router();

// Wrap the controller functions with `catchAsync` for error handling
router.route("/signup").post(validateUser, catchAsync(signup));
router.route("/login").post(catchAsync(login));

module.exports = router;
