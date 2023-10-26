import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../index.js";
import { jwtDecode } from "../modules/users/users.utils.js";
import { internalServerError, unauthorizedError } from "../utils/responses.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

async function authMiddleWare(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return unauthorizedError(res, { error: "Authorization header is missing" });
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return unauthorizedError(res, { error: "Invalid scheme or token" });
    }

    const decoded = jwtDecode(token);

    const user = await prisma.user.findUnique({ where: { email: decoded.email } });

    if (!user) {
      return unauthorizedError(res, { error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    internalServerError(res, { error });
  }
}

export { authMiddleWare };
