const AppError = require("../utilities/app_error");
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: "winstonLogger.log", level: "error" }),
  ],
});

const errorHandler = (error, req, res, next) => {
  // Logging error details for debugging
  logger.log("error", {
    message: error.message,
    stack: error.stack,
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
