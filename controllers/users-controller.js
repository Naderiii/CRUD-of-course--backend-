const UsersModel = require("../models/users-model");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//-------------------------- register ---------------------------

const register = async (req, res, next) => {

  const schema = {
    username: Joi.string().min(3).max(50).required().messages({"string.min": "Minimum characters required"}),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  };

  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error)
    return res.send(validateResult.error.details[0].message);

  const user = await UsersModel.getUserByEmail(req.body.email);
  if (user) return res.status(400).send("user already registered");

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const result = await UsersModel.insertUser(
    req.body.username,
    req.body.email,
    hashPassword
  );
  console.log(result);

  const newUser = await UsersModel.getUserByEmail(req.body.email);

  const token = jwt.sign({id: newUser.id}, process.env.SECRET_KEY)

  res
  .header('Authorization', token)
  .send(_.pick(newUser, ["id", "username", "email"]));   //it dosen't show password
};

//--------------------------------- login ---------------------------

const login = async (req, res, next) => {

  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  };
  
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error)
    return res.send(validateResult.error.details[0].message);

  const user = await UsersModel.getUserByEmail(req.body.email);
  if (!user) return res.status(400).send("email or password is invalid");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("email or password is invalid");
  
  const token = jwt.sign({id : user.id} ,  process.env.SECRET_KEY)
  res.send(token);
};


module.exports = { register, login };
