import express  from "express";
import { newCategory, getACategory, getCategories, updateCategory, removeCategory } from "../categories/categories.controller";

const router = express.Router();


// this for the categories part, which will use the same middleware to achieve this
router.post("/category/create", newCategory);
router.get("/category/:id", getACategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", removeCategory);
router.get("/categories", getCategories);

export default router;