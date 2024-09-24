require("dotenv").config();

const Logger = require("./middlewares/logger");
const authentication = require("./middlewares/authentication");
const helmet = require("helmet")   // helps secure your app by setting various HTTP headers.
const morgan = require("morgan")   // HTTP request logger

const dbDebug = require("debug")("db")  //debug on .env

const coursesRoute = require("./routers/courses-routes")
const homeRoute = require("./routers/home-route")
const usersRoute = require("./routers/users-route")

const errorHandler = require("./middlewares/error_handler");

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
app.use(errorHandler)

app.use(express.urlencoded({extended: true}));       // convert key=value to JSON in req.body
app.use(express.static('public'))                    // for static file
app.use(helmet());                                  

if (app.get("env") === "development")   app.use(morgan("tiny"));      

// dbDebug("Hello from startup debug")

//router
app.use("/api/courses" , coursesRoute );
app.use("/api/users", usersRoute)
app.use("/", homeRoute)

//----------------------------- 


