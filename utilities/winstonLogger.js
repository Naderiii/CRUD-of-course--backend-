const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
    //format.prettyPrint()
  ),
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: "winstonLogger.log", level: "error" }),
    //new transports.Http({level: "warn", host: "localhost", port: 5500, path: "/api/errors"  }),
  ],
});

module.exports = logger