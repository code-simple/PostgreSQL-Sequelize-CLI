const Joi = require("joi");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Define Joi schema
const projectSchema = Joi.object({
  title: Joi.string().required(),
  productImage: Joi.array().items(Joi.string().uri()).required(),
  price: Joi.number().precision(2).required(),
  shortDescription: Joi.string().required(),
  description: Joi.string().required(),
  productUrl: Joi.string().uri().required(),
  category: Joi.array().items(Joi.string()).required(),
  tags: Joi.array().items(Joi.string()).required(),
});

const validateProject = catchAsync(async (req, res, next) => {
  const { error } = projectSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 401));
  }
  return next();
});

module.exports = { validateProject };
