import express from "express";
import { createUser, signIn } from "./users.service.js";
import { validateSignupData } from "./validations/signup.validation.js";
import { validateSigninData } from "./validations/signin.validation.js";
const router = express.Router();
router.post("/signup", validateSignupData, createUser);
router.post("/signin", validateSigninData, signIn);
export { router as UsersController };
//# sourceMappingURL=users.controller.js.map