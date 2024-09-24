const AppError = require("../utilities/app_error");
const {createLogger, format, transports} = require("winston")


const logger = createLogger({
  format : format.json(),
  transports : [
    new transports.Console({level : "info"}),
    new transports.File({filename: "winstonLogger.log", level: "error"})
  ]
})

const errorHandler = (error, req, res, next) => {
  // console.log(error);
  // logger.log("info", "this is message for winston");
  logger.log("error", "this is message for winston");

  if (error.name === "ValidationError")
    return res.status(500).send("validation is failed");

  if (error instanceof AppError)
    return res
      .status(error.statusCode)
      .send({ errorCode: error.errorCode, message: error.message });

  res.status(400).send("something failed");
};
module.exports = errorHandler;
