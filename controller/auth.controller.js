const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const { sendWhatsAppMessage } = require("../service/util.service");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Signup function without `try-catch`
const signup = async (req, res, next) => {
  const body = req.body;

  if (!["1", "2"].includes(body.userType)) {
    throw new AppError("Invalid user type", 400);
  }

  const newUser = await user.create(req.body);

  if (!newUser) {
    return next(new AppError("Failed to create the user", 400));
  }

  const result = newUser.toJSON();

  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  return res.status(201).json({
    status: "success",
    data: result,
  });
};

// Login function without `try-catch`
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const result = await user.findOne({ where: { email } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    await sendWhatsAppMessage(
      "Login Failed: Check someone is hacking your account"
    );
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken({
    id: result.id,
  });

  return res.json({
    status: "success",
    result: { ...result.dataValues, token },
  });
};

// Authentication function without `try-catch`
const authentication = async (req, res, next) => {
  // 1. get the token from headers
  let idToken = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    idToken = req.headers.authorization.split(" ")[1];
  }
  if (!idToken) {
    return next(new AppError("Please login to get access", 401));
  }

  // 2. token verification
  const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);

  // 3. get the user detail from db and add to req object
  const freshUser = await user.findByPk(tokenDetail.id);

  if (!freshUser) {
    return next(new AppError("User no longer exists", 400));
  }
  req.user = freshUser;
  return next();
};

const restrictTo = (...allowedUserTypes) => {
  return (req, res, next) => {
    // Check if the user's type is one of the allowed types
    if (!allowedUserTypes.includes(req.user.userType)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }
    // User has the required permission, proceed to the next middleware
    return next();
  };
};

module.exports = { signup, login, authentication, restrictTo };
