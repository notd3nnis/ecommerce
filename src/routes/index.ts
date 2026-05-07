import express from "express";
import authRoutes from "../modules/auth/auth.routes";
import productRoutes from "../modules/products/product.routes";
import categoryRoutes from "../modules/categories/categories.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);                                      

export default router;
