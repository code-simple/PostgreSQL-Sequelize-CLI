const Project = require("../db/models/project");
const User = require("../db/models/user");
const AppError = require("../utils/appError");
const STATUS = require("../utils/messages");

// Create a new project
const createProject = async (req, res, next) => {
  const newProject = await Project.create(req.body);
  res.status(201).json({
    status: "success",
    data: newProject,
  });
};

// Get all projects for a user
const getAllProject = async (req, res, next) => {
  const userId = req.user.id;
  const result = await Project.findAll({
    include: User,
    where: { createdBy: userId },
  });

  res.json({
    status: "success",
    data: result,
  });
};

// Get a project by its ID
const getProjectById = async (req, res, next) => {
  const projectId = req.params.id;
  const result = await Project.findByPk(projectId, { include: User });
  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }

  res.json({
    status: "success",
    data: result,
  });
};

// Update a project (Single query using Sequelize's update method)
const updateProject = async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  const body = req.body;

  // Directly update the project using `update`
  const [updatedCount, updatedRows] = await Project.update(body, {
    where: { id: req.params.id, createdBy: userId },
    returning: true, // Optional: returns the updated rows
  });

  if (updatedCount === 0) {
    return next(new AppError(STATUS.RESOURCE_NOT_FOUND, 404));
  }

  // Return the first updated record
  const updatedProject = updatedRows[0];

  res.json({
    status: "success",
    data: updatedProject,
  });
};

// Delete a project by ID
const deleteProject = async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;

  const result = await Project.findOne({
    where: { id: projectId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }

  await result.destroy();

  res.json({
    status: "success",
    message: "Record deleted successfully",
  });
};

// Export all controller functions
module.exports = {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
};
