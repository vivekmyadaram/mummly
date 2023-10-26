import { Request, Response, NextFunction } from "express";
import { log } from "../utils/logger.js";

function logger(req: Request, res: Response, next: NextFunction) {
  const ipAddress =
    req.headers["x-forwarded-for"] || // For proxies and load balancers
    req.socket.remoteAddress; // Fallback to remote address if not behind a proxy

  const userAgent = req.headers["user-agent"];
  const userId = req.user?.id;
  const userIdLog = userId ? `User Id - ${userId} | ` : "";

  const message = `${userIdLog}Client IP - ${ipAddress} | User Agent - ${userAgent} 
  | Method - ${req.method} | URL - ${req.url}
  | Request Headers - ${JSON.stringify(req.headers)}`;

  log.info(message);
  next();
}

export { logger };
