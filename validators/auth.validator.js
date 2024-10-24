const Joi = require("joi");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Define Joi schema for user validation
const userSchema = Joi.object({
  userType: Joi.string()
    .valid("0", "1", "2")
    .required()
    .messages({ "any.only": "User type must be one of 0, 1, or 2." }),
  firstName: Joi.string().min(1).max(255).required().messages({
    "string.empty": "First name is required.",
    "string.min": "First name must be at least 1 character long.",
    "string.max": "First name must be less than 255 characters long.",
  }),
  lastName: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Last name is required.",
    "string.min": "Last name must be at least 1 character long.",
    "string.max": "Last name must be less than 255 characters long.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(6).max(1024).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password must be less than 1024 characters long.",
    "string.empty": "Password is required.",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "any.required": "Confirm password is required.",
  }),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  deletedAt: Joi.date().optional().allow(null),
});

// Middleware for validation
const validateUser = catchAsync(async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 401));
  }
  return next();
});

module.exports = { validateUser };
