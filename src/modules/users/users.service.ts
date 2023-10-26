import bcrypt from "bcrypt";
import { prisma } from "../../index.js";
import { generateOTP, jwtDecode, jwtEncode } from "./users.utils.js";
import { Request, Response } from "express";
import { log } from "../../utils/logger.js";
import { SignupPayloadType } from "./validations/signup.validation.js";
import { SigninPayloadType } from "./validations/signin.validation.js";
import {
  badRequestError,
  internalServerError,
  sendSuccess,
  unauthorizedError,
} from "../../utils/responses.js";
import { ChangePasswordPayloadType } from "./validations/change-password.validation.js";
import { transporter } from "../../config/email.js";
import { ForgotPasswordPayloadType } from "./validations/forgot-password.validation.js";
import { ResetPasswordPayloadType } from "./validations/reset-password.validation.js";

async function createUser(req: Request, res: Response) {
  try {
    const data = req.body as SignupPayloadType;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        password: hashedPassword,
      },
    });

    const token = jwtEncode({ email: user.email });

    sendSuccess(res, { message: "Registered successfully", token });
  } catch (error) {
    log.error("Internal Service Error");
    internalServerError(res, { error });
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const data = req.body as SigninPayloadType;
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return unauthorizedError(res, { message: "User not found with the given email" });
    }

    const isPassowordValid = await bcrypt.compare(password, user.password);

    if (!isPassowordValid) {
      return unauthorizedError(res, { message: "Password is wrong" });
    }

    const token = jwtEncode({ email });

    sendSuccess(res, { token });
  } catch (error) {
    log.error("Internal Servce Error");
    internalServerError(res, { error });
  }
}

async function changePassword(req: Request, res: Response) {
  try {
    const data = req.body as ChangePasswordPayloadType;
    const email = req.user.email;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return unauthorizedError(res, { message: "User not found" });
    }

    const isOldPassowordValid = await bcrypt.compare(data.oldPassword, user.password);

    if (!isOldPassowordValid) {
      return unauthorizedError(res, { message: "Old Password is wrong" });
    }

    if (data.oldPassword === data.newPassword) {
      return unauthorizedError(res, {
        message: "The new password should be different from old password",
      });
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.user.update({ where: { email }, data: { password: hashedPassword } });

    sendSuccess(res, { message: "Password has been changed sucessfully" });
  } catch (error) {
    log.error("Internal Servce Error");
    internalServerError(res, { error });
  }
}

async function forgotPassword(req: Request, res: Response) {
  try {
    const data = req.body as ForgotPasswordPayloadType;
    const { email } = data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return unauthorizedError(res, { message: "User not found with the given email" });
    }

    const otp = generateOTP();

    await transporter.sendMail({
      from: "vinaykanna367@gmail.com",
      to: email,
      subject: "Mummly - Forgot Password",
      html: `<h2>OTP: ${otp}`,
    });

    const token = jwtEncode({ otp, email });

    sendSuccess(res, { message: "OTP has been sent to your registered email", token });
  } catch (error) {
    log.error("Internal Servce Error");
    internalServerError(res, { error });
  }
}

async function resetPassword(req: Request, res: Response) {
  try {
    const { otp, password, token } = req.body as ResetPasswordPayloadType;
    const decoded = jwtDecode(token);
    const { email, otp: decodedOtp } = decoded;

    if (otp !== decodedOtp) {
      return badRequestError(res, { message: "OTP is wrong" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({ where: { email }, data: { password: hashedPassword } });

    sendSuccess(res, { message: "Password has been reset succesfully" });
  } catch (error) {
    log.error("Internal Servce Error");
    internalServerError(res, { error });
  }
}

export { createUser, signIn, changePassword, forgotPassword, resetPassword };
