import express from "express";
import { createNewProduct, getProducts, getAProduct, updateProduct, removeProduct, newCategory, getACategory, getCategories, updateCategory, removeCategory } from "./inventory.Controller"

const router = express.Router();

router.get("/check", () => console.log("Inventory route is working"))

// this is role based so the only person authorized to create a product is the admin, so we will add an auth middleware later to check if the user is an admin before allowing them to create a product.

router.post("/create", createNewProduct)
router.get("/products", getProducts)
router.get("/products/:id", getAProduct)
router.put("/products/:id", updateProduct)
router.delete("/products/:id", removeProduct)


// this for the categories part, which will use the same middleware to achieve this 
router.post('/category/create', newCategory)
router.get('/category/:id', getACategory)
router.patch('/category/:id', updateCategory)
router.delete('/category/:id', removeCategory)
router.get('/categories', getCategories)



export default router;