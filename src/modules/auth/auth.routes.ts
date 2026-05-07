import express from "express";
import authControllers from "./auth.controllers";
import { validate } from "../../middleware/validate";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "./auth.validations";
import { auth, protectedRoute } from "../../middleware/auth";

const router = express.Router();

router.post("/register", validate(registerSchema), authControllers.register);
router.post("/login", validate(loginSchema), authControllers.login);
router.post("/refresh", validate(refreshTokenSchema), authControllers.refresh);

// Protected routes
router.post("/logout", auth, authControllers.logout);
router.get("/me", auth, authControllers.me);

export default router;
