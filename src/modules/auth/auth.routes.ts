import express from "express";
import authControllers from "./auth.controllers";
import { validate } from "../../middleware/validate";
import { registerSchema } from "./auth.validations";

const router = express.Router();

router.post("/register", validate(registerSchema), authControllers.register);

export default router;
