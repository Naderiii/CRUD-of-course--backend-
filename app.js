require("dotenv").config();

const express = require("express");
const helmet = require("helmet"); // Helps secure your app by setting various HTTP headers.
const morgan = require("morgan"); // HTTP request logger.
const Logger = require("./middlewares/logger");
const authentication = require("./middlewares/authentication");
const errorHandler = require("./middlewares/error_handler");

const dbDebug = require("debug")("db"); // Debug on .env.

const coursesRoute = require("./routers/courses-routes");
const homeRoute = require("./routers/home-route");
const usersRoute = require("./routers/users-route");

//-------------------------- Create server from .env
const app = express();
app.use(express.json());

// Set the port from the environment variable or default to 3000.
const port = process.env.APP_PORT || 3000;

// Start the server.
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//---------------------------- Middleware
app.use(Logger);
app.use(authentication);

// Middleware for parsing URL-encoded data and serving static files.
app.use(express.urlencoded({ extended: true })); // Convert key=value to JSON in req.body.
app.use(express.static("public")); // Serve static files.
app.use(helmet()); // Use Helmet for security.

if (app.get("env") === "development") {
  app.use(morgan("tiny")); // Log HTTP requests in development mode.
}

// Uncomment to enable debug logging.
// dbDebug("Hello from startup debug");

//---------------------------- Routes
app.use("/api/courses", coursesRoute);
app.use("/api/users", usersRoute);
app.use("/", homeRoute);

// Error handling middleware.
app.use(errorHandler);
