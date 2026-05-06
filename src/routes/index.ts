import express from "express";
import authRoutes from "../modules/auth/auth.routes";
import inventoryRoutes from "../modules/inventory/inventory.routes"

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", inventoryRoutes);

router.get("/me", (req, res) => {
  res.status(200).json({
    name: "John Doe",
    email: "john.doe@example.com",
  });
});

export default router;
