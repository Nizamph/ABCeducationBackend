const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const resourceSchema = mongoose.Schema({
  resourceName: { type: String, required: true },
  resourceDescription: { type: String, required: true },
  resourceDuration: { type: Number, required: true, default: 0 },
  resourceType: { type: String, required: true },
});

const courseSchema = mongoose.Schema({
  courseId: { type: Number, required: true },
  courseName: { type: String, required: true, unique: true },
  coursePrice: { type: Number, required: true, unique: true },
  courseInstructor: { type: String, required: true },
  courseDuration: { type: Number, required: true, defaultValue: 0 },
  resources: { type: resourceSchema },
});

const Resource = mongoose.model("Resource", resourceSchema);
const Course = mongoose.model("Course", courseSchema);
module.exports = {
  Resource,
  Course,
};
