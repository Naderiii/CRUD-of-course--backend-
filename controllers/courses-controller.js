const CoursesModel = require("../models/courses-model");

const getCourse = async (req, res) => {
  try {
    const result = await CoursesModel.getCourse(parseInt(req.params.id));
    if (!result)
      return res.status(404).send("Course with the given ID not found");
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getCourses = async (req, res) => {
  try {
    const result = await CoursesModel.getCourses();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const insertCourse = async (req, res) => {
  try {
    if (!req.body.name || req.body.name.length < 3) {
      return res
        .status(400)
        .send("Name is required and must be at least 3 characters long");
    }

    const result = await CoursesModel.insertCourse(req.body.name);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await CoursesModel.getCourse(parseInt(req.params.id));
    if (!course)
      return res.status(404).send("Course with the given ID not found");
    await CoursesModel.deleteCourse(parseInt(req.params.id));
    res.send(`Course with ID ${req.params.id} deleted`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourse,
  getCourses,
  insertCourse,
  updateCourse,
  deleteCourse,
};
