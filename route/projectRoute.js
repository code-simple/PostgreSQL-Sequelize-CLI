const { authentication, restrictTo } = require("../controller/authController");
const projectController = require("../controller/projectController");

const router = require("express").Router();

router
  .route("/")
  .post(authentication, restrictTo("1"), projectController.createProject)
  .get(authentication, restrictTo("1"), projectController.getAllProject);

router
  .route("/:id")
  .get(authentication, restrictTo("1"), projectController.getProjectById)
  .patch(authentication, restrictTo("1"), projectController.updateProject)
  .delete(authentication, restrictTo("1"), projectController.deleteProject);

module.exports = router;
