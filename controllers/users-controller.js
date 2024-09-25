const UsersModel = require("../models/users-model");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { tryCatchHandler } = require("../utilities/trycatch_handler");
const AppError = require("../utilities/app_error");

//-------------------------- register ---------------------------

const register = tryCatchHandler(async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({ "string.min": "Minimum characters for username required" }),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new AppError(400, error.details[0].message, 400);
  }

  const user = await UsersModel.getUserByEmail(req.body.email);
  if (user) {
    throw new AppError(100, "User already registered", 400);
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const result = await UsersModel.insertUser(
    req.body.username,
    req.body.email,
    hashPassword
  );
  console.log(result);
  
  const newUser = await UsersModel.getUserByEmail(req.body.email);

  const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);

  res
    .header("Authorization", token)
    .send(_.pick(newUser, ["id", "username", "email"])); // it doesn't show password
});

//--------------------------------- login ---------------------------

const login = tryCatchHandler(async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new AppError(400, error.details[0].message, 400);
  }

  const user = await UsersModel.getUserByEmail(req.body.email);
  if (!user) {
    throw new AppError(100, "Email or password is invalid", 400);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    throw new AppError(100, "Email or password is invalid", 400);
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
  res.send(token);
});

module.exports = { register, login };
