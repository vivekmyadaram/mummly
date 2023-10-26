import { NextFunction, Request, Response } from "express";
import z from "zod";
import { badRequestError } from "../../../utils/responses.js";

const schema = z.object({
  email: z.string().email(),
  fullName: z
    .string({ required_error: "Fullname is required" })
    .min(3, "Fullname must contain at least 2 character(s)")
    .max(30, "Fullname must contain at most 30 character(s)"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password should be at least of length 8")
    .max(15, "Passoword should be at most of length 15"),
});

type SignupPayloadType = z.infer<typeof schema>;

function validateSignupData(req: Request, res: Response, next: NextFunction) {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    const error = err?.issues[0]?.message || "Bad Request";
    badRequestError(res, { error });
  }
}

export { validateSignupData, SignupPayloadType };
