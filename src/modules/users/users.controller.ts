import express from "express";
import {
  changePassword,
  createUser,
  forgotPassword,
  resetPassword,
  signIn,
} from "./users.service.js";
import { validateSignupData } from "./validations/signup.validation.js";
import { validateSigninData } from "./validations/signin.validation.js";
import { validateChangePasswordData } from "./validations/change-password.validation.js";
import { validateForgotPasswordData } from "./validations/forgot-password.validation.js";
import { validateResetChangePasswordData } from "./validations/reset-password.validation.js";
import { authMiddleWare } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", validateSignupData, createUser);
router.post("/signin", validateSigninData, signIn);
router.post(
  "/change-password",
  authMiddleWare,
  validateChangePasswordData,
  changePassword
);
router.post("/forgot-password", validateForgotPasswordData, forgotPassword);
router.post("/reset-password", validateResetChangePasswordData, resetPassword);

export { router as UsersController };
