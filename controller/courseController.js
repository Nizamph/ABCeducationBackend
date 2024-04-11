const { Course, Resource } = require("../models/courseModel");

const addCourse = async (req, res) => {
  try {
    const {
      courseId,
      courseName,
      courseInstructor,
      courseDuration,
      coursePrice,
    } = req.body;
    if (
      !courseId ||
      !courseName ||
      !courseInstructor ||
      !courseDuration ||
      !coursePrice
    ) {
      res.status(400).json({
        message: "please provide sufficient information for adding products",
      });
    }
    const addedCourse = new Course({
      courseId: courseId,
      courseName: courseName,
      coursePrice: coursePrice,
      courseInstructor: courseInstructor,
      courseDuration: courseDuration,
    });
    const getAddedResource = await addedCourse.save();
    res.status(201).json({
      addedCourse: getAddedResource,
    });
    console.log(
      "===================addedCourses ==============================",
      getAddedResource
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "internal server error (admin addProducts)" });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id from delete", id);
    if (!id) {
      res.status(400).json({ message: "please provide proper id for delete" });
    }
    const deletedCartItem = await Course.findOneAndDelete({ _id: id });
    res.status(201).json({ deletedCartItem: deletedCartItem });
  } catch (err) {
    res.status(501).json({ message: "internal server error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const getAllCourses = await Course.find({});
    console.log(
      "===================getAllCourses ==============================",
      getAllCourses
    );
    res.status(201).json({
      allCourses: getAllCourses,
    });
  } catch (err) {
    res.status(500).json({
      message: "internal server error(getting products)",
    });
  }
};

const addResources = async (req, res) => {
  try {
    const {
      resourceName,
      resourceDescription,
      resourceDuration,
      resourceType,
    } = req.body;
    if (
      !resourceName ||
      !resourceDescription ||
      !resourceDuration ||
      !resourceType
    ) {
      res.status(400).json({
        message: "please provide sufficient information for adding products",
      });
    }
    const addedResource = new Resource({
      resourceName: resourceName,
      resourceDescription: resourceDescription,
      resourceDuration: resourceDuration,
      resourceType: resourceType,
    });
    const getAddedResource = await addedResource.save();
    res.status(201).json({
      addedResource: getAddedResource,
    });
    console.log(
      "===================addedResources ==============================",
      getAddedResource
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "internal server error (admin addProducts)" });
  }
};

const getResourceById = async (req, res) => {
  try {
    const { id } = req.body;

    console.log("id from request", id);
    const course = await Course.findOne({ id });

    if (!course) {
      return res.status(404).json({ errorMessage: "course not found" });
    }

    const resource = course.resources.find((res) => res._id.equals(resourceId));

    res.status(200).json({ resource: resource });
  } catch (error) {
    console.error("Error occurred while fetching resource:", error);
    throw error;
  }
};

module.exports = {
  addCourse,
  deleteCourse,
  getAllCourses,
  addResources,
  getResourceById,
};
