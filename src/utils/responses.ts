import { Response } from "express";

interface ErrorResponse {
  message?: string;
  error?: any;
}

interface SuccessResponse {
  [key: string]: any;
}

function sendSuccess(res: Response, data: SuccessResponse) {
  return res.status(200).json(data);
}

function badRequestError(res: Response, data?: ErrorResponse) {
  return res.status(400).json({ name: "BadRequest", ...(data || {}) });
}

function internalServerError(res: Response, data?: ErrorResponse) {
  return res.status(500).json({ name: "InternalServiceError", ...(data || {}) });
}

function notFoundError(res: Response, data?: ErrorResponse) {
  return res.status(404).json({ name: "ResourceNotFound", ...(data || {}) });
}

function forbiddenError(res: Response, data?: ErrorResponse) {
  return res.status(403).json({ name: "Forbidden", ...(data || {}) });
}

function unauthorizedError(res: Response, data?: ErrorResponse) {
  res.status(401).json({ name: "Unauthorized", ...(data || {}) });
}

export {
  badRequestError,
  internalServerError,
  notFoundError,
  forbiddenError,
  unauthorizedError,
  sendSuccess,
};
