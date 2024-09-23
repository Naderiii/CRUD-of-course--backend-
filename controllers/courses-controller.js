const CoursesModel = require('../models/courses-model-mysql');

const getCourse = (req, res) => {
  CoursesModel.getCourse(parseInt(req.params.id))
    .then((result) => {
      if (!result) return res.status(404).send("Course with the given ID not found");
      res.send(result);
    })
    .catch((err) => res.status(500).send("Server error"));
};

const getCourses = (req, res) => {
  CoursesModel.getCourses()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send("Server error"));
};

const insertCourse = (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("Name is required and must be at least 3 characters long");
  }
  
  CoursesModel.insertCourse(req.body.name)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send("Server error"));
};

const updateCourse = (req, res) => {
  CoursesModel.getCourse(parseInt(req.params.id))
    .then((course) => {
      if (!course) return res.status(404).send("Course with the given ID not found");
      
      if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send("Name is required and must be at least 3 characters long");
      }

      return CoursesModel.updateCourse(parseInt(req.params.id), req.body.name);
    })
    .then((updatedCourse) => res.send(updatedCourse))
    .catch((err) => res.status(500).send("Server error"));
};

const deleteCourse = (req, res) => {
  CoursesModel.getCourse(parseInt(req.params.id))
    .then((course) => {
      if (!course) return res.status(404).send("Course with the given ID not found");

      return CoursesModel.deleteCourse(parseInt(req.params.id));
    })
    .then(() => res.send(`Course with ID ${req.params.id} deleted`))
    .catch((err) => res.status(500).send("Server error"));
};

module.exports = {
  getCourse,
  getCourses,
  insertCourse,
  updateCourse,
  deleteCourse,
};
