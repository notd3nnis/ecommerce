import express from "express";
import authControllers from "./auth.controllers";
import { validate } from "../../middleware/validate";
import { loginSchema, registerSchema } from "./auth.validations";

const router = express.Router();

router.post("/register", validate(registerSchema), authControllers.register);
router.post("/login", validate(loginSchema), authControllers.login);

export default router;
