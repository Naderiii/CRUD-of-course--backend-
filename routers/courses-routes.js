const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courses-controller");
const auth = require("../middlewares/authentication");

// router.use(auth);  // to protect the routes with JWT token.  // auth middleware is required for all routes under /api/courses

router.get("/:id", coursesController.getCourse);

router.get("/", auth, coursesController.getCourses);

router.post("/", coursesController.insertCourse);

router.put("/:id", coursesController.updateCourse);

router.delete("/:id", coursesController.deleteCourse);

module.exports = router;
