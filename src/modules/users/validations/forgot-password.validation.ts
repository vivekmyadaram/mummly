import { NextFunction, Request, Response } from "express";
import { badRequestError } from "../../../utils/responses.js";
import z from "zod";

const schema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid Email"),
});

type ForgotPasswordPayloadType = z.infer<typeof schema>;

function validateForgotPasswordData(
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

export { validateForgotPasswordData, ForgotPasswordPayloadType };
