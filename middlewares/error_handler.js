const AppError = require("../utilities/app_error");
const logger = require("../utilities/winstonLogger");

const errorHandler = (error, req, res, next) => {
  // Logging error details for debugging
  logger.log("error", {
    message: error.message,
    name: error.name,
    url: req.originalUrl,
    method: req.method,
    time: new Date().toISOString(),
  });

  // Handle validation errors
  if (error.name === "ValidationError") {
    return res.status(400).send({ message: "Validation failed", details: error.details });
  }

  // Handle application-specific errors
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .send({ errorCode: error.errorCode, message: error.message });
  }

  // Handle other unexpected errors
  res.status(500).send({ message: "An unexpected error occurred." });
};

module.exports = errorHandler;
