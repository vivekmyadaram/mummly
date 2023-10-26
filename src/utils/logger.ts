import { createLogger, transports, format } from "winston";

const log = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [new transports.File({ filename: "log/application.log" })],
});

export { log };
