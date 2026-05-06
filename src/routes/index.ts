import express from "express";
import authRoutes from "../modules/auth/auth.routes";
import productRoutes from "../modules/products/product.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);

export default router;
