const { result } = require("underscore");
const CoursesModel = require("../models/courses-model");
const { tryCatchHandler } = require("../utilities/trycatch_handler");


const getCourse = tryCatchHandler(async (req, res) => {
  const result = await CoursesModel.getCourse(parseInt(req.params.id));
  if (!result)
    return res.status(404).send("Course with the given ID not found");
  res.send(result);
});

const getCourses = tryCatchHandler(async (req, res) => {
  const result = await CoursesModel.getCourses();
  res.send(result);
});

const insertCourse = tryCatchHandler(async (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    return res
      .status(400)
      .send("Name is required and must be at least 3 characters long");
  }
  const result = await CoursesModel.insertCourse(req.body.name);
  res.send(result);
});

const updateCourse = tryCatchHandler(async (req, res) => {
  const course = await CoursesModel.getCourse(parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course with the given ID not found");

  if (!req.body.name || req.body.name.length < 3) {
    return res
      .status(400)
      .send("Name is required and must be at least 3 characters long");
  }
  const updatedCourse = await CoursesModel.updateCourse(
    parseInt(req.params.id),
    req.body.name
  );
  res.send(updatedCourse);
});

const deleteCourse = tryCatchHandler(async (req, res) => {
  const course = await CoursesModel.getCourse(parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course with the given ID not found");
  await CoursesModel.deleteCourse(parseInt(req.params.id));
  res.send(`Course with ID ${req.params.id} deleted`);
});

module.exports = {
  getCourse,
  getCourses,
  insertCourse,
  updateCourse,
  deleteCourse,
};
