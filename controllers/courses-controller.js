const CoursesModel = require("../models/courses-model");
const { tryCatchHandler } = require("../utilities/trycatch_handler");
const Joi = require("joi"); // for validation

// validation function for courses
const validateCourse = (course) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

const getCourse = tryCatchHandler(async (req, res) => {
  const course = await CoursesModel.getCourse(parseInt(req.params.id));
  if (!course) 
    return res.status(404).send({ error: "Course with the given ID not found" });
  
  res.send(course);
});

const getCourses = tryCatchHandler(async (req, res) => {
  const courses = await CoursesModel.getCourses();
  res.send(courses);
});

const insertCourse = tryCatchHandler(async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const course = await CoursesModel.insertCourse(req.body.title);
  res.send(course);
});

const updateCourse = tryCatchHandler(async (req, res) => {
  const course = await CoursesModel.getCourse(parseInt(req.params.id));
  if (!course)
    return res.status(404).send({ error: "Course with the given ID not found" });

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const updatedCourse = await CoursesModel.updateCourse(parseInt(req.params.id), req.body.title);
  res.send(updatedCourse);
});

const deleteCourse = tryCatchHandler(async (req, res) => {
  const course = await CoursesModel.getCourse(parseInt(req.params.id));
  if (!course)
    return res.status(404).send({ error: "Course with the given ID not found" });

  await CoursesModel.deleteCourse(parseInt(req.params.id));
  res.send({ message: `Course with ID ${req.params.id} deleted` });
});

module.exports = {
  getCourse,
  getCourses,
  insertCourse,
  updateCourse,
  deleteCourse,
};
