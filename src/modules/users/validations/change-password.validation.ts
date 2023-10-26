import { NextFunction, Request, Response } from "express";
import { badRequestError } from "../../../utils/responses.js";
import z from "zod";

const schema = z.object({
  oldPassword: z
    .string({ required_error: "Old password is required" })
    .min(8, "Password should be at least of length 8")
    .max(15, "Passoword should be at most of length 15"),
  newPassword: z
    .string({ required_error: "New password is required" })
    .min(8, "Password should be at least of length 8")
    .max(15, "Passoword should be at most of length 15"),
});

type ChangePasswordPayloadType = z.infer<typeof schema>;

function validateChangePasswordData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    const error = err?.issues[0]?.message || "Bad Request";
    badRequestError(res, { error });
  }
}

export { validateChangePasswordData, ChangePasswordPayloadType };
