const express = require("express");
const router = express.Router();
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const {
  addCourse,
  deleteCourse,
  getAllCourses,
  addResources,
  getResourceById,
} = require("../controller/courseController");
router.post("/addCourse", addCourse);

router.delete("/deleteCourse", deleteCourse);

router.get("/getAllCourses", getAllCourses);

router.post("/addResources", addResources);
router.post("/getResources", getResourceById);
module.exports = router;
