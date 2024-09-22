require("dotenv").config();

const Logger = require("./middlewares/logger");
const authentication = require("./middlewares/authentication");
const helmet = require("helmet")
const helmet = require("morgan")

const dbDebug = require("debug")("db")  //debug on .env

const coursesRoute = require("./routers/courses_routes")

//--------------------------- create server on .env

const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});


//----------------------------- middleware
app.use(Logger);
app.use(authentication);
app.use(express.urlencoded((extended = true))); // convert key=value to JSON in req.body
app.use(express.static('public'))  // for static file
app.use(helmet()); // helps secure your app by setting various HTTP headers.

if (app.get("env") === "development") app.use(morgan("tiny")) // HTTP request logger

dbDebug("Hello from startup debug")

app.use("/api/courses" , coursesRoute );  // middleware of route

//----------------------------- 


