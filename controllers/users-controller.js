const UsersModel = require("../models/users-model");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { tryCatchHandler } = require("../utilities/trycatch_handler");
const AppError = require("../utilities/app_error");

//-------------------------- register ---------------------------

const register = tryCatchHandler(async (req, res, next) => {
  // Validation schema with custom messages
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({ 
        "string.min": "Username must be at least 3 characters long", 
        "string.required": "Username is required" 
      }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.required": "Email is required"
    }),
    password: Joi.string().min(5).max(50).required().messages({
      "string.min": "Password must be at least 5 characters long",
      "string.required": "Password is required"
    }),
  });

  // Validation check
  const { error } = schema.validate(req.body);
  if (error) {
    throw new AppError(400, error.details[0].message, 400);
  }

  // Check if the user is already registered
  const user = await UsersModel.getUserByEmail(req.body.email);
  if (user) {
    throw new AppError(400, "User already registered", 400);
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  // Register the user
  await UsersModel.insertUser(req.body.username, req.body.email, hashPassword);

  // Fetch the newly registered user
  const newUser = await UsersModel.getUserByEmail(req.body.email);

  // Generate JWT token
  const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, {
    expiresIn: "1h", // Token expiration for better security
  });

  // Send the token and user information (excluding password)
  res
    .header("Authorization", token)
    .status(201)
    .send(_.pick(newUser, ["id", "username", "email"])); // Exclude password from response
});

//--------------------------------- login ---------------------------

const login = tryCatchHandler(async (req, res, next) => {
  // Validation schema for login
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.required": "Email is required"
    }),
    password: Joi.string().min(5).max(50).required().messages({
      "string.min": "Password must be at least 5 characters long",
      "string.required": "Password is required"
    }),
  });

  // Validation check
  const { error } = schema.validate(req.body);
  if (error) {
    throw new AppError(400, error.details[0].message, 400);
  }

  // Fetch user by email
  const user = await UsersModel.getUserByEmail(req.body.email);
  if (!user) {
    throw new AppError(400, "Email or password is invalid", 400);
  }

  // Compare the password with the hashed one
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    throw new AppError(400, "Email or password is invalid", 400);
  }

  // Generate JWT token for the user
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1h", // Token expiration for security
  });

  // Send the token
  res.status(200).send({ token });
});

module.exports = { register, login };
