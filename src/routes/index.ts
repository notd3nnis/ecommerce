import express from "express";
import authRoutes from "../modules/auth/auth.routes";

const router = express.Router();

router.use("/auth", authRoutes);

router.get("/me", (req, res) => {
  res.status(200).json({
    name: "John Doe",
    email: "john.doe@example.com",
  });
});

export default router;
