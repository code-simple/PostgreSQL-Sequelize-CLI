const { authentication, restrictTo } = require("../controller/authController");
const projectController = require("../controller/projectController");
const { validateProject } = require("../validators/project.validator");
const catchAsync = require("../utils/catchAsync"); // Importing catchAsync

const router = require("express").Router();

router
  .route("/")
  .post(
    authentication,
    restrictTo("1"),
    validateProject,
    catchAsync(projectController.createProject) // Wrapped with catchAsync
  )
  .get(
    authentication,
    restrictTo("1"),
    catchAsync(projectController.getAllProject) // Wrapped with catchAsync
  );

router
  .route("/:id")
  .get(
    authentication,
    restrictTo("1"),
    catchAsync(projectController.getProjectById) // Wrapped with catchAsync
  )
  .patch(
    authentication,
    restrictTo("1"),
    catchAsync(projectController.updateProject) // Wrapped with catchAsync
  )
  .delete(
    authentication,
    restrictTo("1"),
    catchAsync(projectController.deleteProject) // Wrapped with catchAsync
  );

module.exports = router;
