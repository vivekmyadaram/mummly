import { NextFunction, Request, Response } from "express";
import { badRequestError } from "../../../utils/responses.js";
import z from "zod";

const schema = z.object({
  token: z.string({ required_error: "Token is required" }),
  otp: z.string({ required_error: "OTP is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password should be at least of length 8")
    .max(15, "Passoword should be at most of length 15"),
});

type ResetPasswordPayloadType = z.infer<typeof schema>;

function validateResetChangePasswordData(
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

export { validateResetChangePasswordData, ResetPasswordPayloadType };
